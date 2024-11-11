import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import Hero from './Hero';
import Dialogue from './Dialogue';
import { mapData } from './mapData';
import { mapObjects } from './mapObjects';
import { calculateCameraOffset, TILE_SIZE, ZOOM_TILE_WIDTH, ZOOM_TILE_HEIGHT } from './camera';
import { validTileTypes } from './constants';
import Menu from './Menu';
import BattleScreen from './BattleScreen';
import ShopScreen from './ShopScreen'; // Import the ShopScreen component

const Map: React.FC = () => {
    const [heroPosition, setHeroPosition] = useState({ x: 66, y: 42 });
    const [currentNPC, setCurrentNPC] = useState<22 | 23 | 25 | null>(null);
    const [dialogueVisible, setDialogueVisible] = useState(false);
    const [inBattle, setInBattle] = useState(false);
    const [inShop, setInShop] = useState(false); // New state to manage shop screen

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

        if (event.key === 'ArrowUp' || event.key === 'w') newY--;
        if (event.key === 'ArrowDown' || event.key === 's') newY++;
        if (event.key === 'ArrowLeft' || event.key === 'a') newX--;
        if (event.key === 'ArrowRight' || event.key === 'd') newX++;

        if (mapData[newY] && mapData[newY][newX] !== undefined && validTileTypes.includes(mapData[newY][newX])) {
            setHeroPosition({ x: newX, y: newY });
        }
    };

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

    const handleBattleStart = () => {
        setInBattle(true);
        setDialogueVisible(false);
    };

    const handleShopOpen = () => {
        setInShop(true);
        setDialogueVisible(false);
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
          {inBattle ? (
            <BattleScreen />
          ) : inShop ? (
            <ShopScreen onClose={() => setInShop(false)} />
          ) : (
            <>
              {mapData.slice(offsetY, offsetY + ZOOM_TILE_HEIGHT).map((row, rowIndex) =>
                row.slice(offsetX, offsetX + ZOOM_TILE_WIDTH).map((tileType, colIndex) => (
                  <Tile key={`${rowIndex}-${colIndex}`} type={tileType} />
                ))
              )}
              <Hero position={{ x: heroPosition.x - offsetX, y: heroPosition.y - offsetY }} onMove={handleHeroMove} onInteract={handleInteract} />
              {dialogueVisible && currentNPC !== null && (
                <Dialogue npcType={currentNPC} onClose={handleCloseDialogue} onBattleStart={handleBattleStart} onOpenShop={handleShopOpen} heroPosition={{
                                    x: 0,
                                    y: 0
                                }} />
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
