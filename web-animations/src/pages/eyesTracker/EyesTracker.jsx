import { useState, useEffect, useRef } from 'react';

import skin from './skin.png';
import { FaGithub } from 'react-icons/fa6';

export default function EyesTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const calculatePupilPosition = (eyeRef) => {
      if (!eyeRef.current) return;
      
      const eyeRect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;
      
      // Calculate angle between eye center and mouse position
      const angle = Math.atan2(
        mousePosition.y - eyeCenterY,
        mousePosition.x - eyeCenterX
      );
      
      // Maximum pupil movement range (in pixels)
      const maxMovement = 15;
      
      // Calculate pupil position based on angle and limited movement
      const pupilX = Math.cos(angle) * maxMovement;
      const pupilY = Math.sin(angle) * maxMovement;
      
      return { x: pupilX, y: pupilY };
    };
    
    // Update left eye pupil
    const leftPupilPosition = calculatePupilPosition(leftEyeRef);
    if (leftPupilPosition && leftEyeRef.current) {
      const pupilElement = leftEyeRef.current.querySelector('.pupil');
      pupilElement.style.transform = `translate(${leftPupilPosition.x}px, ${leftPupilPosition.y}px)`;
    }
    
    // Update right eye pupil
    const rightPupilPosition = calculatePupilPosition(rightEyeRef);
    if (rightPupilPosition && rightEyeRef.current) {
      const pupilElement = rightEyeRef.current.querySelector('.pupil');
      pupilElement.style.transform = `translate(${rightPupilPosition.x}px, ${rightPupilPosition.y}px)`;
    }
  }, [mousePosition]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 select-none bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${skin})` }}>
      <h1 className="text-3xl font-bold mb-8 text-white">Move your mouse around!</h1>
      
      <div className="flex space-x-8">
        {/* Left eye */}
        <div 
          ref={leftEyeRef}
          className="relative w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-300"
        >
          {/* Pupil */}
          <div className="pupil w-16 h-16 bg-black rounded-full transition-transform duration-75 ease-out">
            {/* Highlight */}
            <div className="absolute w-6 h-6 bg-white rounded-full opacity-70 top-2 left-2"></div>
          </div>
          
          {/* Eyelid shadow */}
          <div className="absolute inset-0 rounded-full border-t-8 border-gray-300 opacity-30"></div>
        </div>
        
        {/* Right eye */}
        <div 
          ref={rightEyeRef}
          className="relative w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-300"
        >
          {/* Pupil */}
          <div className="pupil w-16 h-16 bg-black rounded-full transition-transform duration-75 ease-out">
            {/* Highlight */}
            <div className="absolute w-6 h-6 bg-white rounded-full opacity-70 top-2 left-2"></div>
          </div>
          
          {/* Eyelid shadow */}
          <div className="absolute inset-0 rounded-full border-t-8 border-gray-300 opacity-30"></div>
        </div>
      </div>
    </div>
  );
}