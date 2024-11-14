import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import Hero from './Hero';
import Dialogue from './Dialogue';
import { mapData } from './mapData';
import { mapObjects } from './mapObjects';
import { calculateCameraOffset, TILE_SIZE, ZOOM_TILE_WIDTH, ZOOM_TILE_HEIGHT } from './camera';
import { validTileTypes } from './constants';
import Menu from './Menu';
import ShopScreen from './ShopScreen'; // Import the ShopScreen component
import BattleScreen from './BattleScreen'; // Import the BattleScreen component
import TutorScreen from './TutorScreen'; // Import TutorScreen


const Map: React.FC = () => {
    const [heroPosition, setHeroPosition] = useState({ x: 66, y: 42 });
    const [currentNPC, setCurrentNPC] = useState<22 | 23 | 25 | null>(null);
    const [dialogueVisible, setDialogueVisible] = useState(false);
    const [inShop, setInShop] = useState(false); // New state to manage shop screen
    const [inBattle, setInBattle] = useState(false); // New state to manage battle screen
    const [inTutor, setInTutor] = useState(false); // New state for TutorScreen

    const mapWidthInTiles = mapData[0].length;
    const mapHeightInTiles = mapData.length;

    const { offsetX, offsetY } = calculateCameraOffset(
        heroPosition,
        mapWidthInTiles,
        mapHeightInTiles,
        ZOOM_TILE_WIDTH,
        ZOOM_TILE_HEIGHT
    );

    const handleKeyDown = (event: KeyboardEvent) => {
        const { x, y } = heroPosition;
        let newX = x;
        let newY = y;

        if (event.key === 'AarrowUp' || event.key === 'w') newY--;
        if (event.key === 'ArrowDown' || event.key === 's') newY++;
        if (event.key === 'ArrowLeft' || event.key === 'a') newX--;
        if (event.key === 'ArrowRight' || event.key === 'd') newX++;

        if (mapData[newY] && mapData[newY][newX] !== undefined && validTileTypes.includes(mapData[newY][newX])) {
            setHeroPosition({ x: newX, y: newY });
        }
    };


    useEffect(() => {
        const loadGameState = async () => {
            const response = await fetch("http://localhost:4000/load");
            const state = await response.json();
            if (state) {
                setHeroPosition(state.heroPosition);
                setInShop(state.inShop);
                setInBattle(state.inBattle);
                setInTutor(state.inTutor);
            }
        };
        loadGameState();

    }, []);
    const saveGameState = async (state: any) => {
        await fetch("http://localhost:4000/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state),
        });
    };

    // Save the game state when any relevant state changes
    useEffect(() => {
        saveGameState({ heroPosition, inShop, inBattle, inTutor });
    }, [heroPosition, inShop, inBattle, inTutor]);


    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [heroPosition]);

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


    const handleOpenTutor = () => {
        setInTutor(true);
        setDialogueVisible(false);
    };
    const handleShopOpen = () => {
        setInShop(true);
        setDialogueVisible(false);
    };

    const handleBattleOpen = () => {
        setInBattle(true);
        setDialogueVisible(false);
    };

    function handleHeroMove(_newPosition: { x: number; y: number }): void{
        
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
            {inShop ? (
                <ShopScreen onClose={() => setInShop(false)} />
            ) : inBattle ? (
                <BattleScreen onClose={() => setInBattle(false)} />
                ) :  inTutor ? (
                    <TutorScreen onClose={() => setInTutor(false)} />
                ) : (
                        
                <>
                    {mapData.slice(offsetY, offsetY + ZOOM_TILE_HEIGHT).map((row, rowIndex) =>
                        row.slice(offsetX, offsetX + ZOOM_TILE_WIDTH).map((tileType, colIndex) => (
                            <Tile key={`${rowIndex}-${colIndex}`} type={tileType} />
                        ))
                    )}
                    <Hero
                        position={{ x: heroPosition.x - offsetX, y: heroPosition.y - offsetY }}
                        onMove={handleHeroMove}
                        onInteract={handleInteract}
                    />
                    {dialogueVisible && currentNPC !== null && (
                        <Dialogue
                            npcType={currentNPC}
                            onClose={handleCloseDialogue}
                            onOpenShop={handleShopOpen}
                                        onOpenBattle={handleBattleOpen}
                                         onOpenTutor={handleOpenTutor} // New prop to open tutor screen
                            heroPosition={{ x: 0, y: 0 }}
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
                    <Menu />
                </>
            )}
        </div>
    );
};

export default Map;
