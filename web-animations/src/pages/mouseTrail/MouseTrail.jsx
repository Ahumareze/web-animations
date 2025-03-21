import { AnimatePresence, motion } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';

const images = [
    '/ege/image-1.JPG',
    '/ege/image-2.JPG',
    '/ege/image-3.JPG',
    '/ege/image-4.JPG',
    '/ege/image-5.JPG',
    '/ege/image-6.JPG',
    '/ege/image-7.JPG',
    '/ege/image-8.JPG',
]

const MouseTrail = () => {
    const [positions, setPositions] = useState([]);
    const timeoutRef = useRef(null);
    const lastRecordedPositionRef = useRef(null);
    const maxTrailPoints = 50; // Number of divs in the trail
    const minDistanceBetweenPoints = 50; // Minimum distance between points in pixels

  useEffect(() => {
    // Set up event listeners when component mounts
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up event listeners when component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const calculateDistance = (pos1, pos2) => {
    return Math.sqrt(
      Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
    );
  };

  const handleMouseMove = (e) => {
    // Clear previous timeout if exists
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    
    const currentPosition = { x: e.clientX, y: e.clientY };
    
    // Only add new position if it's far enough from the last recorded position
    if (!lastRecordedPositionRef.current || 
        calculateDistance(lastRecordedPositionRef.current, currentPosition) >= minDistanceBetweenPoints) {
      
      lastRecordedPositionRef.current = currentPosition;
      
      // Add new position to the trail
      setPositions(prev => {
        const newPositions = [...prev, currentPosition];
        // Keep only the latest positions (limit to maxTrailPoints)
        return newPositions.slice(-maxTrailPoints);
      });
    }

        // Set timeout to clear trail after mouse stops moving
        timeoutRef.current = setTimeout(() => {
            setPositions([]);
            lastRecordedPositionRef.current = null;
        }, 1000);
    };

    // Calculate size and opacity for each trail point
    const getTrailStyles = (index) => {
        const totalPoints = positions.length;
        const reversedIndex = totalPoints - index - 1;
        const scale = 1 - (reversedIndex / totalPoints) * 0.5; // Gradually reduce size
        const opacity = 1 - (reversedIndex / totalPoints) * 0.8; // Gradually reduce opacity
        
        return {
        transform: `scale(${scale})`,
        opacity: opacity,
        };
    };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        {positions.map((pos, index) => (
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.8}}
                key={index}
                className="absolute bg-purple-500 pointer-events-none h-[100px] w-[100px]"
                style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    transform: `translate(-50%, -50%) ${getTrailStyles(index).transform}`,
                    opacity: getTrailStyles(index).opacity,
                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                }}
            >
                <img
                    src={images[index]}
                    alt=''
                    className='h-full w-full object-cover'
                />
            </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MouseTrail;