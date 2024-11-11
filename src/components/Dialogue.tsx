import React, { useState, useEffect } from 'react';

interface DialogueProps {
    npcType: 22 | 23 | 25;
    onClose: () => void;
    heroPosition: { x: number; y: number };
    onBattleStart: () => void;
    onOpenShop: () => void;  // New prop to trigger shop screen
}

const Dialogue: React.FC<DialogueProps> = ({ npcType, onClose, onBattleStart, onOpenShop }) => {
    const portraits = {
        22: '/src/assets/npcs/merchant.png',
        23: '/src/assets/npcs/warrior.png',
        25: '/src/assets/objects/cave.png'
    };

    const dialogues = {
        22: "Welcome to my shop! Would you like to buy something?",
        23: "Ah, a fellow warrior! Ready for a challenge?",
        25: "Are you sure you want to fight Toxic Bug?"
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

    const handleChoice = (choice: string) => {
        if (choice === "Yes") {
            if (npcType === 22) {
                onOpenShop(); // Open the shop if NPC 22 (Merchant)
            } else if (npcType === 25) {
                onBattleStart(); // Start battle if NPC 25
            }
        }
        onClose(); // Close the dialogue after a choice
    };

    return (
        <div className="dialogue" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            fontFamily: 'Pixel, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 15,
        }}>
            <img src={portraits[npcType]} alt="NPC Portrait" style={{ width: '300px', height: '300px', marginBottom: '200px' }} />
            <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '20px' }}>
                <p>{text}</p>
                {isComplete && (
                    <div style={{ marginTop: '20px' }}>
                        {choices.map((choice, index) => (
                            <button key={index} onClick={() => handleChoice(choice)} style={{ fontSize: '2rem', margin: '10px' }}>
                                {choice}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dialogue;
