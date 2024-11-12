import React from 'react';
import './Tile.css';
interface TileProps {
    type: number;
}

const Tile: React.FC<TileProps> = ({ type }) => {
    const tileImages = [
        '/src/assets/path/walkwater.png', //0
        '/src/assets/path/grass.png',//1
        '/src/assets/path/path.png',//2
        '/src/assets/path/water.png',//3
        '/src/assets/path/pathearthD.png',//4
        '/src/assets/path/earthwaterD.png',//5
        '/src/assets/path/grasswaterL.png',//6
        '/src/assets/path/grasswaterR.png',//7
        '/src/assets/path/grasswaterU.png',//8
        '/src/assets/path/grasspathL.png',//9
        '/src/assets/path/grasspathR.png',//10
        '/src/assets/path/grasspathU.png',//11
        '/src/assets/path/grasspathD.png',//12
        '/src/assets/path/grasspathRD.png',//13
        '/src/assets/path/grasspathLD.png',//14
        '/src/assets/path/grasspathRU.png',//15
        '/src/assets/path/grasspathLU.png',//16
        '/src/assets/path/grassearthD.png',//17
        '/src/assets/path/pathbordergrassearthL.png',//18
        '/src/assets/path/pathcornertopL.png',//19
        '/src/assets/path/pathcornertopR.png',//20
        '/src/assets/path/grassNO.png',//21
        '/src/assets/path/shopNPC.png', //22 THIS TILE WILL BE USED TO ACTIVATE THE NPC DIALOGUE EVENT FOR THE SHOP //9
        '/src/assets/path/warriorNPC.png',//23 THIS TILE WILL BE USED TO ACTIVATE THE NPC DIALOGUE EVENT FOR THE ARMORY //10
        '/src/assets/path/grasswaterD.png',//24
        '/src/assets/path/battle1.png',//25
        '/src/assets/path/pathgrassRU.png',//26
        '/src/assets/path/pathgrassRD.png',//27
        '/src/assets/path/endpath.png',//28
        '/src/assets/path/endpath2.png',//29
        '/src/assets/path/earthwaterR.png',//30
        '/src/assets/path/grassearthR.png',//31
        '/src/assets/path/earthwaterL.png',//32
        '/src/assets/path/pathNO.png',//33


    ];

    const tileImage = tileImages[type];

    return (
        <div
            className='tiles'
            style={{
                position: 'relative',
                width: '48px',   // Updated size
                height: '48px',  // Updated size
                backgroundImage: `url(${tileImage})`,
                backgroundSize: 'cover',

            }}
        />
    );
};

export default Tile;
