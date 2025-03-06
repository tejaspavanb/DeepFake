import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Image, Video, AlertTriangle } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to DeepFake Detective
        </h1>
        <p className="text-xl text-gray-600">
          Advanced AI-powered deepfake detection for images and videos
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Link
          to="/image-detection"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Image className="w-12 h-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Image Detection</h2>
          <p className="text-gray-600">
            Upload images to detect manipulation and analyze authenticity with our advanced AI model.
          </p>
        </Link>

        <Link
          to="/video-detection"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Video className="w-12 h-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Video Detection</h2>
          <p className="text-gray-600">
            Analyze videos frame by frame to identify deepfake manipulation and synthetic content.
          </p>
        </Link>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 text-yellow-400 mr-2" />
          <p className="text-yellow-700">
            <strong>Important:</strong> While our detection system is highly accurate, no detection method is perfect. Always verify critical content through multiple sources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;