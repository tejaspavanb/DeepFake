document.addEventListener('DOMContentLoaded', function() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Determine if we're on image or video page
    const isVideoPage = window.location.href.includes('video');
    const analyzedMedia = isVideoPage ? document.getElementById('analyzedVideo') : document.getElementById('analyzedImage');
    
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
        // Update dropzone text with selected file
        dropzone.querySelector('.dropzone-text').textContent = `Selected: ${file.name}`;
        
        // Create object URL for preview
        const objectUrl = URL.createObjectURL(file);
        
        // Set src of media element for preview
        if (analyzedMedia) {
            analyzedMedia.src = objectUrl;
        }
        
        // Enable upload button
        uploadBtn.disabled = false;
    }
    
    // Handle upload button click
    uploadBtn.addEventListener('click', function() {
        if (fileInput.files.length === 0) {
            alert('Please select a file first.');
            return;
        }
        
        // Show loading indicator if it exists
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }
        
        // Disable upload button during processing
        uploadBtn.disabled = true;
        uploadBtn.textContent = 'Processing...';
        
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        
        // Determine endpoint based on file type
        const url = isVideoPage ? '/analyze-video' : '/analyze-image';
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            // Hide loading indicator
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            
            // Re-enable upload button
            uploadBtn.disabled = false;
            uploadBtn.textContent = isVideoPage ? 'Analyze Video' : 'Analyze Image';
            
            // Show results container
            resultsContainer.style.display = 'block';
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
            
            // Update UI with results
            if (isVideoPage) {
                updateVideoResults(data);
            } else {
                updateImageResults(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during analysis. Please try again.');
            
            // Hide loading indicator
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            
            // Re-enable upload button
            uploadBtn.disabled = false;
            uploadBtn.textContent = isVideoPage ? 'Analyze Video' : 'Analyze Image';
        });
    });
    
    // Function to update image results UI
    function updateImageResults(data) {
        // Update confidence score
        const confidenceScore = document.getElementById('confidenceScore');
        if (confidenceScore) {
            confidenceScore.textContent = data.confidence || '0%';
        }
        
        // Update confidence bar
        const confidenceBar = document.getElementById('confidenceBar');
        if (confidenceBar) {
            confidenceBar.style.width = data.confidence || '0%';
        }
        
        // Update result verdict
        const resultVerdict = document.getElementById('resultVerdict');
        if (resultVerdict) {
            resultVerdict.textContent = data.result || 'Unknown';
            
            // Update class for styling
            const analysisResult = resultVerdict.parentElement;
            analysisResult.className = 'analysis-result';
            if (data.result === 'Real') {
                analysisResult.classList.add('result-authentic');
            } else if (data.result === 'Fake') {
                analysisResult.classList.add('result-fake');
            } else {
                analysisResult.classList.add('result-uncertain');
            }
        }
        
        // Update metadata table
        const metadataTable = document.getElementById('metadataTable');
        if (metadataTable && data.metadata) {
            metadataTable.innerHTML = '';
            for (const [key, value] of Object.entries(data.metadata)) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="metadata-key">${key}:</td>
                    <td class="metadata-value">${value}</td>
                `;
                metadataTable.appendChild(row);
            }
        }
    }
    
    // Function to update video results UI
    function updateVideoResults(data) {
        // Update real frames
        const realFrames = document.getElementById('realFrames');
        if (realFrames) {
            realFrames.textContent = data.real_frames || '0';
        }
        
        // Update fake frames
        const fakeFrames = document.getElementById('fakeFrames');
        if (fakeFrames) {
            fakeFrames.textContent = data.fake_frames || '0';
        }
        
        // Update accuracy score
        const accuracyScore = document.getElementById('accuracyScore');
        if (accuracyScore) {
            accuracyScore.textContent = data.detection_accuracy || '0%';
        }
        
        // Update accuracy bar
        const accuracyBar = document.getElementById('accuracyBar');
        if (accuracyBar) {
            // Extract percentage value if it's a string
            let accuracyValue = data.detection_accuracy;
            if (typeof accuracyValue === 'string') {
                accuracyValue = parseFloat(accuracyValue) + '%';
            }
            accuracyBar.style.width = accuracyValue || '0%';
        }
        
        // Update result verdict
        const resultVerdict = document.getElementById('resultVerdict');
        if (resultVerdict) {
            resultVerdict.textContent = data.final_verdict || 'Unknown';
            
            // Update class for styling
            const analysisResult = resultVerdict.parentElement;
            analysisResult.className = 'analysis-result';
            if (data.final_verdict === 'Real') {
                analysisResult.classList.add('result-authentic');
            } else if (data.final_verdict === 'Fake') {
                analysisResult.classList.add('result-fake');
            } else {
                analysisResult.classList.add('result-uncertain');
            }
        }
        
        // Update frames analyzed count
        const framesAnalyzed = document.getElementById('framesAnalyzed');
        if (framesAnalyzed && data.real_frames && data.fake_frames) {
            framesAnalyzed.textContent = (parseInt(data.real_frames) + parseInt(data.fake_frames)) || '0';
        }
    }
});