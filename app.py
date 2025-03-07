from flask import Flask, render_template, request, redirect, url_for
import os
from werkzeug.utils import secure_filename
from prog import predict_image, predict_video

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