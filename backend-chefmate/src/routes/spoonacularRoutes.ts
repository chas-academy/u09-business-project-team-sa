import express, { Request, Response } from 'express';
import { getRecipeById, searchRecipes } from '../services/spoonacular';

const router = express.Router();

// GET /api/recipes?q=chicken
router.get('/recipes', async (req: Request, res: Response): Promise<void> => {
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

// GET /api/recipes/:id
router.get('/recipes/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Missing recipe ID' }); 
    return;
  }

  try {
    const recipe = await getRecipeById(id);
    res.json(recipe);
  } catch (err) {
    console.error(`Error fetching recipe ${id}:`, err);
    res.status(500).json({ error: 'Error fetching recipe details' });
  }
});

export default router;