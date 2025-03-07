from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
from werkzeug.utils import secure_filename
from prog import predict_image, predict_video, extract_metadata

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads/'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB limit

# Ensure the upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/image')
def image():
    return render_template('image.html')

@app.route('/video')
def video():
    return render_template('video.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/analyze-image', methods=['POST'])
def analyze_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'})
    
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Call predict_image from prog.py
        prediction = predict_image(filepath)  # This is from prog.py
        
        return jsonify({
            'result': prediction["result"],
            'confidence': f"{prediction['confidence'] * 100:.2f}%",
            'metadata': prediction["metadata"]
        })
    

@app.route('/analyze-video', methods=['POST'])
def analyze_video():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'})
    
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Call predict_video from prog.py
        video_analysis = predict_video(filepath)
        
        return jsonify({
            'fake_frames': video_analysis["fake_frames"],
            'real_frames': video_analysis["real_frames"],
            'final_verdict': video_analysis["final_verdict"],
            'detection_accuracy': f"{video_analysis['detection_accuracy']:.2f}%"
        })

@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return redirect(url_for('image'))
    
    file = request.files['file']
    if file.filename == '':
        return redirect(url_for('image'))
    
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Call the predict_image function from prog.py
        result = predict_image(file_path)
        
        return render_template('image.html', result=result, image_path=file_path)
    
    return redirect(url_for('image'))

@app.route('/upload-video', methods=['POST'])
def upload_video():
    if 'file' not in request.files:
        return redirect(url_for('video'))
    
    file = request.files['file']
    if file.filename == '':
        return redirect(url_for('video'))
    
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Call the predict_video function from prog.py
        result = predict_video(file_path)
        
        return render_template('video.html', result=result, video_path=file_path)
    
    return redirect(url_for('video'))

if __name__ == '__main__':
    app.run(debug=True)