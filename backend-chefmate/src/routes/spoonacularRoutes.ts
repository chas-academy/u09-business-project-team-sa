import express, { Request, Response } from 'express';
import { searchRecipes } from '../services/spoonacular';

const router = express.Router();

router.get('/api/recipes', async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q as string;
  if (!query) {
    res.status(400).json({ error: 'Missing query param ?q=' });
    return;
  }

  try {
    const data = await searchRecipes(query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching from Spoonacular API' });
  }
});

export default router;