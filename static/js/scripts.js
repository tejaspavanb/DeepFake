document.addEventListener('DOMContentLoaded', function() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const analyzedImage = document.getElementById('analyzedImage');
    
    // Handle click on dropzone
    dropzone.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Handle drag and drop
    dropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropzone.style.backgroundColor = '#f0f5ff';
    });
    
    dropzone.addEventListener('dragleave', function() {
        dropzone.style.backgroundColor = '';
    });
    
    dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropzone.style.backgroundColor = '';
        
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });
    
    // Handle file selection
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            handleFileSelect(fileInput.files[0]);
        }
    });
    
    function handleFileSelect(file) {
        dropzone.querySelector('.dropzone-text').textContent = `Selected: ${file.name}`;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadBtn.disabled = false;
        }
        reader.readAsDataURL(file);
    }
    
    // Handle upload button click
    uploadBtn.addEventListener('click', function() {
        if (fileInput.files.length === 0) {
            alert('Please select a file first.');
            return;
        }
        
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        
        const url = fileInput.files[0].type.startsWith('video/') ? '/analyze-video' : '/analyze-image';
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            resultsContainer.style.display = 'block';
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
            
            document.querySelector('.analysis-result').textContent = data.final_verdict || data.result;
            document.querySelector('.progress-fill').style.width = data.confidence || data.detection_accuracy;
        })
        .catch(error => console.error('Error:', error));
    });
});