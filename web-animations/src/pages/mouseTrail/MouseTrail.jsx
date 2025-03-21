import React, { useState, useEffect, useRef } from 'react';
import './MouseTrail.css';

//The array of images to be rendered
const images = [
    '/images/image-1.JPG',
    '/images/image-2.JPG',
    '/images/image-3.JPG',
    '/images/image-4.JPG',
    '/images/image-5.JPG',
    '/images/image-6.JPG',
    '/images/image-7.JPG',
    '/images/image-8.JPG',
];
//images in this demo are from Ege Berkina 👉 https://x.com/egeberkina

const MouseTrail = () => {
    const [positions, setPositions] = useState([]);
    const timeoutRef = useRef(null);
    const lastRecordedPositionRef = useRef(null);
    const maxTrailPoints = images.length;  // 🚧 update image array to have more images rendered
    const minDistanceBetweenPoints = 50;

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
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
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const currentPosition = { x: e.clientX, y: e.clientY };

        if (!lastRecordedPositionRef.current ||
            calculateDistance(lastRecordedPositionRef.current, currentPosition) >= minDistanceBetweenPoints) {
            lastRecordedPositionRef.current = currentPosition;
            setPositions(prev => {
                const newPositions = [...prev, currentPosition];
                return newPositions.slice(-maxTrailPoints);
            });
        }

        timeoutRef.current = setTimeout(() => {
            setPositions([]);
            lastRecordedPositionRef.current = null;
        }, 1000);
    };

    return (
        <div className="mouse-trail-container">
            <div className="trail-wrapper">
                {positions.map((pos, index) => (
                    <div
                        key={index}
                        className="trail-point"
                        style={{
                            left: `${pos.x}px`,
                            top: `${pos.y}px`,
                            transform: `translate(-50%, -50%)`,
                            opacity: 1 - (index / positions.length) * 0.8,
                        }}
                    >
                        <img src={images[index % images.length]} alt='' className='trail-image' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MouseTrail;