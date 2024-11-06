// NPC.tsx
import React from 'react';

interface NPCProps {
    name: string;
    position: { x: number; y: number };
    onInteract: (name: string) => void;
}

const NPC: React.FC<NPCProps> = ({ name, position, onInteract }) => {
    return (
        <div
            onClick={() => onInteract(name)}
            style={{
                position: 'absolute',
                left: position.x * 48, // Assuming each tile is 48px wide
                top: position.y * 48, // Assuming each tile is 48px tall
                cursor: 'pointer',
            }}
        >
            <span>{name}</span>
        </div>
    );
};

export default NPC;
