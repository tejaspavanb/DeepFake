import os
import cv2
import numpy as np
import exifread
from tqdm import tqdm
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

# Load the trained MesoNet model
model = load_model("mesonet_deepfake_detector.h5")

# Function to extract metadata from an image
def extract_metadata(image_path):
    """
    Extracts metadata from an image file to check for any manipulations.
    """
    metadata_info = {}

    try:
        with open(image_path, 'rb') as img_file:
            tags = exifread.process_file(img_file)

        # Extract key metadata fields
        metadata_info["Camera"] = tags.get("Image Model", "Unknown")
        metadata_info["Software Used"] = tags.get("Image Software", "Unknown")
        metadata_info["Date Taken"] = tags.get("EXIF DateTimeOriginal", "Unknown")

        # Flag if software modification is detected
        if metadata_info["Software Used"] != "Unknown":
            metadata_info["Warning"] = "Possible image manipulation detected!"

    except Exception as e:
        metadata_info["Error"] = str(e)

    return metadata_info

# Function to predict if an image is real or fake & print accuracy
def predict_image(image_path):
    """
    Detects if an image is a deepfake and prints accuracy.
    """
    img = load_img(image_path, target_size=(256, 256))
    img = img_to_array(img) / 255.0  # Normalize
    img = np.expand_dims(img, axis=0)  # Add batch dimension

    prediction = model.predict(img)[0][0]
    confidence = prediction if prediction > 0.5 else (1 - prediction)
    result = "Fake" if prediction > 0.5 else "Real"

    print(f"\n🔍 **Deepfake Detection Result**")
    print(f"🖼️ Image: {image_path}")
    print(f"🧐 Prediction: {result} ({confidence * 100:.2f}% confidence)")

    # Extract metadata
    metadata = extract_metadata(image_path)
    print("\n📄 **Metadata Information**")
    for key, value in metadata.items():
        print(f"🔹 {key}: {value}")

    return {
        "result": result,
        "confidence": confidence,
        "metadata": extract_metadata(image_path)
    }

# Function to process a video and detect deepfakes frame by frame
def predict_video(video_path, frame_interval=10):
    """
    Process a video and detect deepfakes frame by frame.
    """
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    fake_frames, real_frames = 0, 0
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    # Process frames
    for _ in tqdm(range(total_frames // frame_interval), desc="Processing Video"):
        success, frame = cap.read()
        if not success:
            break

        if frame_count % frame_interval == 0:
            temp_path = "temp_frame.jpg"
            cv2.imwrite(temp_path, frame)  # Save frame temporarily
            result = predict_image(temp_path)  # Detect deepfake

            if result == "Fake":
                fake_frames += 1
            else:
                real_frames += 1

            # Display result on frame
            cv2.putText(frame, f"Prediction: {result}", (50, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0) if result == "Real" else (0, 0, 255), 2)
            cv2.imshow("Deepfake Detection", frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        frame_count += 1

    cap.release()
    cv2.destroyAllWindows()

    # Print final video result
    total_analyzed = fake_frames + real_frames
    accuracy = (max(fake_frames, real_frames) / total_analyzed) * 100 if total_analyzed else 0

    print("\n=== Video Deepfake Detection Results ===")
    print(f"Fake Frames: {fake_frames}")
    print(f"Real Frames: {real_frames}")
    print(f"Final Verdict: {'Fake' if fake_frames > real_frames else 'Real'}")
    print(f"Detection Accuracy: {accuracy:.2f}%")
    return {
        "result": result,
        "confidence": accuracy,
        "metadata": extract_metadata(video_path)
    }

# Main function to handle user input
def main():
    print("\n📢 Deepfake Detection - Choose an Option")
    print("1️⃣ Detect Deepfake in an Image")
    print("2️⃣ Detect Deepfake in a Video")

    choice = input("Enter choice (1 or 2): ")

    if choice == "1":
        image_path = input("Enter the image path: ")
        if os.path.exists(image_path):
            predict_image(image_path)
        else:
            print("❌ Error: Image file not found!")

    elif choice == "2":
        video_path = input("Enter the video path: ")
        if os.path.exists(video_path):
            predict_video(video_path)
        else:
            print("❌ Error: Video file not found!")

    else:
        print("⚠️ Invalid choice! Please enter 1 or 2.")

# Run the script
if __name__ == "__main__":
    main()
