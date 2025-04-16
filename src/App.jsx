import React, { useState } from 'react';
import Webcam from './components/Webcam';

const App = () => {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center">
      <header className="w-full flex justify-between items-center p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">FaceDet</h1>
        <nav>
          <ul className="flex space-x-6">
            <li className="cursor-pointer hover:text-gray-400">Home</li>
          </ul>
        </nav>
      </header>

      <div className="flex flex-grow w-full max-w-6xl p-6">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src="https://www.shutterstock.com/image-vector/vector-human-artificial-head-dispersion-600nw-2481097795.jpg"
            alt="Face Detection Illustration"
            className="w-350 h-280 rounded-lg"
          />
        </div>

        <div className="flex flex-col items-center justify-center w-1/2 relative">
          {!showCamera ? (
            <>
              <p className="text-center text-lg mb-4">
                Face detection uses Deep Learning Models to identify and track faces in real-time,
                enabling various applications like emotion recognition, security,
                and user interaction.
              </p>
              <button
                onClick={() => setShowCamera(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg text-lg"
              >
                Start Emotion Detection
              </button>
            </>
          ) : (
            <>
              <Webcam showCamera={showCamera} setShowCamera={setShowCamera} />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={() => {
                    setShowCamera(false);
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white py-2 px-6 rounded-lg text-lg"
                >
                  Stop Emotion Detection
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
