// src/components/Hero.tsx for hero movement on the MAP
import React, { useEffect } from 'react';

interface HeroProps {
    position: { x: number; y: number };
    onMove: (newPosition: { x: number; y: number }) => void;
    onInteract: () => void; // Added for NPC interaction
}

const Hero: React.FC<HeroProps> = ({ position, onMove, onInteract }) => {
    const [keyPressed, setKeyPressed] = React.useState(false);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!keyPressed) {
            switch (event.key) {
                case 'ArrowUp':
                    onMove({ x: position.x, y: position.y - 1 });
                    break;
                case 'ArrowDown':
                    onMove({ x: position.x, y: position.y + 1 });
                    break;
                case 'ArrowLeft':
                    onMove({ x: position.x - 1, y: position.y });
                    break;
                case 'ArrowRight':
                    onMove({ x: position.x + 1, y: position.y });
                    break;
                case 'Enter': // Check if Enter is pressed for interaction
                    onInteract();
                    break;
                default:
                    break;
            }
            setKeyPressed(true);
        }
    };

    const handleKeyUp = () => setKeyPressed(false);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [keyPressed, position]);

    return (
        <div
            className="hero"
            style={{
                position: 'absolute',
                top: position.y * 48 - 35,
                left: position.x * 48,
                width: '48px',
                height: '96px',
                backgroundImage: 'url(/src/assets/characters/MapHero4.png)',
                backgroundSize: 'cover',
                zIndex: 10

            }}
        />
    );
};

export default Hero;
