import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import Hero from './Hero';
import Dialogue from './Dialogue';
import { mapData } from './mapData';
import { mapObjects } from './mapObjects';
import { calculateCameraOffset, TILE_SIZE, ZOOM_TILE_WIDTH, ZOOM_TILE_HEIGHT } from './camera';
import { validTileTypes } from './constants';
import Menu from './Menu'; // Import the Menu component
import BattleScreen from './BattleScreen';  // Import BattleScreen component

const Map: React.FC = () => {
    const [heroPosition, setHeroPosition] = useState({ x: 66, y: 42 });
    const [currentNPC, setCurrentNPC] = useState<22 | 23 | 25 | null>(null);
    const [dialogueVisible, setDialogueVisible] = useState(false);
    const [inBattle, setInBattle] = useState(false); // Add the state to manage battle status

    // Map dimensions in tiles
    const mapWidthInTiles = mapData[0].length;
    const mapHeightInTiles = mapData.length;

    // Calculate the camera offset each time the hero moves
    const { offsetX, offsetY } = calculateCameraOffset(
        heroPosition,
        mapWidthInTiles,
        mapHeightInTiles,
        ZOOM_TILE_WIDTH,
        ZOOM_TILE_HEIGHT
    );

    // Handle key down for movement
    const handleKeyDown = (event: KeyboardEvent) => {
        const { x, y } = heroPosition;
        let newX = x;
        let newY = y;

        // Update position based on key press
        if (event.key === 'ArrowUp' || event.key === 'w') newY--;
        if (event.key === 'ArrowDown' || event.key === 's') newY++;
        if (event.key === 'ArrowLeft' || event.key === 'a') newX--;
        if (event.key === 'ArrowRight' || event.key === 'd') newX++;

        // Check for valid movement (e.g., grass tiles)
        if (
            mapData[newY] &&
            mapData[newY][newX] !== undefined &&
            validTileTypes.includes(mapData[newY][newX])
        ) {
            setHeroPosition({ x: newX, y: newY });
        }
    };

    // Add and remove event listener for keydown
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [heroPosition]);

    // Handle interactions
    const handleInteract = () => {
        const tileValue = mapData[heroPosition.y][heroPosition.x];
        if (tileValue === 22 || tileValue === 23 || tileValue === 25) {
            setCurrentNPC(tileValue);
            setDialogueVisible(true);
        }
    };

    const handleCloseDialogue = () => {
        setDialogueVisible(false);
        setCurrentNPC(null);
    };

    // Start the battle when the player selects "Yes" on the Clock Dungeon option
    const handleBattleStart = () => {
        setInBattle(true);  // Set inBattle state to true
        setDialogueVisible(false); // Close the dialogue when the battle starts
    };

    function handleHeroMove(_newPosition: { x: number; y: number }): void {
        // Functionality for hero movement (not implemented here)
    }

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${ZOOM_TILE_WIDTH}, ${TILE_SIZE}px)`,
                gridTemplateRows: `repeat(${ZOOM_TILE_HEIGHT}, ${TILE_SIZE}px)`,
                width: `${ZOOM_TILE_WIDTH * TILE_SIZE}px`,
                height: `${ZOOM_TILE_HEIGHT * TILE_SIZE}px`,
                overflow: 'hidden',
                position: 'relative',
            }}
        >

            {/* Render BattleScreen when in battle */}
            {inBattle ? (
                <BattleScreen />
            ) : (
                <>
                    {/* Render Visible Tiles */}
                    {mapData.slice(offsetY, offsetY + ZOOM_TILE_HEIGHT).map((row, rowIndex) =>
                        row.slice(offsetX, offsetX + ZOOM_TILE_WIDTH).map((tileType, colIndex) => (
                            <Tile key={`${rowIndex}-${colIndex}`} type={tileType} />
                        ))
                    )}

                    {/* Render Hero */}
                    <Hero
                        position={{
                            x: heroPosition.x - offsetX,
                            y: heroPosition.y - offsetY,
                        }}
                        onMove={handleHeroMove}
                        onInteract={handleInteract}
                    />

                    {/* Render Dialogue */}
                    {dialogueVisible && currentNPC !== null && (
                        <Dialogue
                            npcType={currentNPC}
                            onClose={handleCloseDialogue}
                            heroPosition={heroPosition}
                            onBattleStart={handleBattleStart}  // Pass handleBattleStart to the Dialogue component
                        />
                    )}

                    {/* Render Objects */}
                    {mapObjects.map((object, index) => (
                        <img
                            key={index}
                            src={object.src}
                            alt="Map Object"
                            style={{
                                position: 'absolute',
                                top: (object.y - offsetY) * TILE_SIZE,
                                left: (object.x - offsetX) * TILE_SIZE,
                                width: `${object.width}px`,
                                height: `${object.height}px`,
                                pointerEvents: 'none',
                                zIndex: object.zindex,
                            }}
                        />
                    ))}

                    {/* Render Menu */}
                    <Menu /> {/* Add the Menu component */}
                </>
            )}
        </div>
    );
};

export default Map;
