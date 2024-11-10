const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/mental_health', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const scoreSchema = new mongoose.Schema({
    user: String,
    score: Number,
    timestamp: String
});

const Score = mongoose.model('Score', scoreSchema);

app.use(bodyParser.json());
app.use(cors());

// Fetch scores for a specific user
app.get('/api/scores', (req, res) => {
    const user = req.query.user;
    Score.find({ user: user }, (err, scores) => {
        if (err) return res.status(500).send(err);
        res.json({ scores: scores });
    });
});

// Save a new score
app.post('/api/scores', (req, res) => {
    const newScore = new Score(req.body);
    newScore.save((err, score) => {
        if (err) return res.status(500).send(err);
        res.json(score);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
