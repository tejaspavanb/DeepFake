import React from 'react';
import { Shield, Brain, AlertTriangle, Cpu } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About DeepFake Detective
        </h1>
        <p className="text-xl text-gray-600">
          Advanced AI-powered deepfake detection for a safer digital world
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Brain className="w-12 h-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Our Technology</h2>
          <p className="text-gray-600">
            We use state-of-the-art deep learning models trained on vast datasets of both authentic and manipulated media. Our system analyzes subtle patterns and artifacts that are typically invisible to the human eye.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Cpu className="w-12 h-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
          <p className="text-gray-600">
            Our AI models examine various aspects of media files, including metadata, pixel-level patterns, and temporal consistency in videos. This multi-layered approach ensures high accuracy in detection.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 text-blue-600 mr-2">•</span>
            <span>Real-time analysis of images and videos</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 text-blue-600 mr-2">•</span>
            <span>Detailed metadata analysis and verification</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 text-blue-600 mr-2">•</span>
            <span>Frame-by-frame video analysis with confidence scores</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 text-blue-600 mr-2">•</span>
            <span>Support for multiple file formats and high-resolution media</span>
          </li>
        </ul>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-yellow-400 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
            <p className="text-yellow-700">
              While our system uses advanced AI technology to detect deepfakes, no detection method is 100% foolproof. We recommend using this tool as part of a broader verification process, especially for sensitive content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;