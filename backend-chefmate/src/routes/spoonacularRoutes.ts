import express, { Request, Response } from 'express';
import { searchRecipes } from '../services/spoonacular';

const app = express();

app.get('/api/recipes', async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) return res.status(400).json({ error: 'Missing query param ?q=' });

  try {
    const data = await searchRecipes(query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching from Spoonacular API' });
  }
});
