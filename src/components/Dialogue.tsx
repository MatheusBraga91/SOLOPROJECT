import React, { useState, useEffect } from 'react';

interface DialogueProps {
    npcType: 22 | 23 | 25;
    onClose: () => void;
    heroPosition: { x: number; y: number };
}

const Dialogue: React.FC<DialogueProps> = ({ npcType, onClose }) => {
    const portraits = {
        22: '/src/assets/npcs/merchant.png',
        23: '/src/assets/npcs/warrior.png',
        25: '/src/assets/npcs/clock.png'
    };

    const dialogues = {
        22: "Welcome to my shop! Would you like to buy something?",
        23: "Ah, a fellow warrior! Ready for a challenge?",
        25: "Are you sure you want to enter the Clock Dungeon?"
    };

    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [choices] = useState(["Yes", "No", "More Info"]);

    useEffect(() => {
        if (index < dialogues[npcType].length) {
            const timer = setTimeout(() => {
                setText(prev => prev + dialogues[npcType][index]);
                setIndex(prev => prev + 1);
            }, 50);
            return () => clearTimeout(timer);
        } else {
            setIsComplete(true);
        }
    }, [index, npcType]);

    // Fullscreen dialogue styling (overlays the entire screen)
    const dialogueStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0, // Full screen, so set top and left to 0
        left: 0,
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark transparent background
        color: 'white',
        fontFamily: 'Pixel, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 11, // Ensure it's above everything else
    };

    const textStyle: React.CSSProperties = {
        fontSize: '3rem', // Adjust text size
        textAlign: 'center',
        marginBottom: '20px',
    };

    const choicesStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    };

    const buttonStyle: React.CSSProperties = {
        fontSize: '1.2rem',
        backgroundColor: 'transparent',
        border: '1px solid white',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    return (
        <div className="dialogue" style={dialogueStyle}>
            <img src={portraits[npcType]} alt="NPC Portrait" style={{ width: '300px', height: '300px', marginBottom: '200px' }} />
            <div className="dialogue-text" style={textStyle}>
                <p>{text}</p>
                {isComplete && (
                    <div className="choices" style={choicesStyle}>
                        {choices.map((choice, i) => (
                            <button key={i} style={buttonStyle} onClick={() => onClose()}>{choice}</button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dialogue;
