import React, { useState, useEffect } from 'react';

const BackgroundColorChanger = () => {
    const getRandomHexColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const [backgroundColor, setBackgroundColor] = useState(getRandomHexColor);

    useEffect(() => {
        const changeBackgroundColor = () => {
            setBackgroundColor(getRandomHexColor());
        };

        const interval = setInterval(changeBackgroundColor, 1000); // Change color every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="min-h-screen flex items-center justify-center transition-background duration-1000"
            style={{ backgroundColor, transition: 'background 2s' }}
        >
            <h1 className="text-4xl text-white">Background Color Changer</h1>
        </div>
    );
};

export default BackgroundColorChanger;
