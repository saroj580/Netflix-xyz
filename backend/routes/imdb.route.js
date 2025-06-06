import express from 'express';
import axios from 'axios';
const router = express.Router();

// Proxy route for IMDB search
router.get('/search', async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'Missing search query' });
    }
    try {
        const response = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(q)}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from IMDB proxy' });
    }
});

export default router; 