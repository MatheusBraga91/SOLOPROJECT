import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const filePath = path.resolve(__dirname, './data/gameState.json');

// Route to save game state
app.post('/save', (req, res) => {
    fs.writeFileSync(filePath, JSON.stringify(req.body));
    res.send({ status: 'Game state saved!' });
});

// Route to load game state
app.get('/load', (req, res) => {
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        res.json(data);
    } else {
        res.json({});
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
