import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';

interface DetectionResult {
  isDeepfake: boolean;
  confidence: number;
  metadata: {
    dimensions: string;
    format: string;
    size: string;
    created: string;
    modified: string;
  };
}

const ImageDetection = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        analyzeImage(file);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulated analysis delay - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result - replace with actual detection logic
    setResult({
      isDeepfake: Math.random() > 0.5,
      confidence: Math.random() * 100,
      metadata: {
        dimensions: '1920x1080',
        format: file.type,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        created: new Date().toLocaleString(),
        modified: new Date().toLocaleString()
      }
    });
    
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Image Deepfake Detection</h1>

      <div className="mb-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {isDragActive
              ? 'Drop the image here'
              : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supports: JPG, JPEG, PNG
          </p>
        </div>
      </div>

      {image && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Uploaded Image</h2>
            <img
              src={image}
              alt="Uploaded"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            {isAnalyzing ? (
              <div className="space-y-4">
                <Skeleton height={24} />
                <Skeleton height={100} />
                <Skeleton height={150} />
              </div>
            ) : result ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  {result.isDeepfake ? (
                    <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  )}
                  <span className="text-lg font-medium">
                    {result.isDeepfake ? 'Likely Deepfake' : 'Likely Authentic'}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="mb-2">Confidence Score</div>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div
                      className={`h-4 rounded-full ${
                        result.isDeepfake ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {result.confidence.toFixed(1)}%
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Image Metadata</h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(result.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">
                          {key}:
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetection;