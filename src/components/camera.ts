export const TILE_SIZE = 48;
export const ZOOM_TILE_WIDTH = 40;
export const ZOOM_TILE_HEIGHT = 20;

export const calculateCameraOffset = (
    heroPosition: { x: number; y: number },
    mapWidth: number,
    mapHeight: number,
    zoomWidth: number,
    zoomHeight: number
) => {
    // Center the hero in the viewport
    let offsetX = heroPosition.x - Math.floor(zoomWidth / 2);
    let offsetY = heroPosition.y - Math.floor(zoomHeight / 2);

    // Clamp offsets to keep the viewport within the map boundaries
    offsetX = Math.max(0, Math.min(offsetX, mapWidth - zoomWidth));
    offsetY = Math.max(0, Math.min(offsetY, mapHeight - zoomHeight));

    return { offsetX, offsetY };
};
