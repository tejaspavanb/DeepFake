
# DeepFake Detective 🕵️♂️

---

## 🌟 Overview

DeepFake Detective is an advanced AI-powered platform designed to combat digital misinformation by detecting deepfake content in images and videos. With the rapid evolution of AI technology, distinguishing between real and synthetic media has become increasingly challenging. Our system leverages cutting-edge machine learning models and computer vision techniques to provide accurate, real-time detection of deepfake manipulations.

---

## 🔑 Key Features

1. **🤖 AI-Powered Detection**
   - Utilizes a pre-trained MesoNet model for image analysis
   - Frame-by-frame video processing with OpenCV
   - Real-time results with confidence percentages

2. **📊 Comprehensive Metadata Analysis**
   - Extracts camera information, software used, and original timestamps
   - Identifies potential manipulation markers in metadata

3. **💻 User-Friendly Interface**
   - Intuitive drag-and-drop file upload
   - Clear visualization of analysis results
   - Responsive design for all devices

4. **🔒 Privacy-Centric**
   - Automatic deletion of uploaded content post-analysis
   - No data storage or tracking

5. **⚙️ Technical Specifications**
   - Supports JPG, PNG, MP4, and AVI formats
   - Image file size limit: 10MB
   - Video file size limit: 50MB

---

## 🏗️ Technical Architecture

### Backend 🛠️
- **Framework**: Flask (Python)
- **Machine Learning**: TensorFlow/Keras
- **Video Processing**: OpenCV
- **Metadata Extraction**: exifread
- **APIs**: RESTful endpoints for file analysis

### Frontend 🎨
- **Markup**: HTML5
- **Styling**: CSS3 (Flexible Box Model, Grid Layout)
- **JavaScript**: Modern ES6+ syntax
- **UI Components**: Custom SVG icons, progressive enhancement

---

## 🚀 Getting Started

### 📋 Prerequisites
- Python 3.8+
- pip package manager
- Git version control system

### 🔧 Installation

1. **📥 Clone Repository**
   ```bash
   git clone https://github.com/tejaspavanb/DeepFake
   cd deepfake-detective
   ```

2. **📦 Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **🤖 Download Model**
   - Obtain `mesonet_deepfake_detector.h5` from [original source](https://github.com/DavidBuzzard/MesoNet)
   - Place the model file in the project root directory

4. **▶️ Run Application**
   ```bash
   python app.py
   ```

---

## 📖 Usage Guide

1. **🌐 Access Platform**
   - Open your web browser and navigate to `http://localhost:5000`

2. **🖱️ Navigation**
   - Use the top navigation bar to access different sections:
     - 🏠 Home
     - 📷 Image Detection
     - 🎥 Video Detection
     - ℹ️ About

3. **📤 File Analysis**
   - **Image Detection**:
     - Drag and drop image files into the designated area
     - Or click to browse and select files
     - Click "Analyze Image" to process
   - **Video Detection**:
     - Follow similar steps for video files
     - Processing may take longer depending on video length

4. **📊 Results Interpretation** (Yet to be done)
   - Color-coded authenticity status (🟢 Authentic | 🔴 Fake)
   - Confidence percentage based on AI model certainty
   - Detailed metadata analysis in list format

---

## 📂 Project Structure

```
deepfake-detective/
├── app.py                      # Main Flask application
├── prog.py                     # Deepfake detection algorithms
├── static/
│   ├── css/                    # Stylesheets
│   ├── js/                     # Client-side JavaScript
│   ├── uploads/                # Temporary file storage
├── templates/                  # HTML templates
│   ├── index.html              # Home page
│   ├── image.html              # Image detection interface
│   ├── video.html              # Video detection interface
│   └── about.html              # Informational page
├── mesonet_deepfake_detector.h5 # Pre-trained model (place here)
└── README.md                   # Documentation
```

---

## 👥 Contribution Guidelines

We welcome contributions from the open-source community. To contribute:

1. Fork the repository
2. Create a new feature/fix branch:
   ```bash
   git checkout -b feature/description
   ```
3. Commit your changes with descriptive messages
4. Push to your fork and submit a pull request

---

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


## 🙏 Acknowledgements

- MesoNet model architecture by [David Buzzard](https://github.com/DavidBuzzard/MesoNet)
- OpenCV development team
- TensorFlow/Keras development team
- Flask framework contributors

---

[⬆️ Back to Top](#deepfake-detective-)
