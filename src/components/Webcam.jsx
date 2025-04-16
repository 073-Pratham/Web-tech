import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const Webcam = ({ showCamera, setShowCamera }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    setIsLoading(false);
  };

  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const stopVideo = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const detectEmotions = async () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        const canvas = canvasRef.current;
        const dims = faceapi.matchDimensions(canvas, videoRef.current, true);
        const resized = faceapi.resizeResults(detections, dims);

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceExpressions(canvas, resized);
      }
    }, 100);
  };

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    if (showCamera) {
      startVideo().then(detectEmotions);
    } else {
      stopVideo();
    }

    return () => {
      stopVideo();
    };
  }, [showCamera]);

  return (
    <div className="relative">
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl">
          Loading Models...
        </div>
      ) : (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            width="640"
            height="480"
            className="rounded-lg border-2 border-gray-700"
          />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            className="absolute top-0 left-0 rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Webcam;
