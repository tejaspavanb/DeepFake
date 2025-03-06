import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Play, Pause, AlertCircle, CheckCircle } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';

interface FrameAnalysis {
  timestamp: number;
  isDeepfake: boolean;
  confidence: number;
}

interface DetectionResult {
  isDeepfake: boolean;
  overallConfidence: number;
  frameAnalysis: FrameAnalysis[];
  metadata: {
    duration: string;
    format: string;
    size: string;
    resolution: string;
    fps: number;
    codec: string;
  };
}

const VideoDetection = () => {
  const [video, setVideo] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideo(url);
      analyzeVideo(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.mov']
    },
    multiple: false
  });

  const analyzeVideo = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulated analysis delay - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock result - replace with actual detection logic
    setResult({
      isDeepfake: Math.random() > 0.5,
      overallConfidence: Math.random() * 100,
      frameAnalysis: Array.from({ length: 10 }, (_, i) => ({
        timestamp: i,
        isDeepfake: Math.random() > 0.5,
        confidence: Math.random() * 100
      })),
      metadata: {
        duration: '00:01:30',
        format: file.type,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        resolution: '1920x1080',
        fps: 30,
        codec: 'H.264'
      }
    });
    
    setIsAnalyzing(false);
  };

  const togglePlay = () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Video Deepfake Detection</h1>

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
              ? 'Drop the video here'
              : 'Drag & drop a video here, or click to select'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supports: MP4, WebM, MOV
          </p>
        </div>
      </div>

      {video && (
        <div className="space-y-8">
          <div className="relative">
            <video
              src={video}
              className="w-full rounded-lg shadow-md"
              controls={false}
            />
            <button
              onClick={togglePlay}
              className="absolute bottom-4 left-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
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
                  <div className="mb-2">Overall Confidence Score</div>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div
                      className={`h-4 rounded-full ${
                        result.isDeepfake ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${result.overallConfidence}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {result.overallConfidence.toFixed(1)}%
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-4">Frame Analysis</h3>
                  <div className="h-24 flex items-end space-x-1">
                    {result.frameAnalysis.map((frame, index) => (
                      <div
                        key={index}
                        className="flex-1 relative group"
                        style={{ height: `${frame.confidence}%` }}
                      >
                        <div
                          className={`w-full h-full ${
                            frame.isDeepfake ? 'bg-red-500' : 'bg-green-500'
                          }`}
                        />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {frame.timestamp}s: {frame.confidence.toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Video Metadata</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(result.metadata).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-gray-600 capitalize">
                          {key}:
                        </span>
                        <span className="ml-2 font-medium">{value}</span>
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

export default VideoDetection;