import express, { Request, Response } from 'express';
import { getRecipeById, searchRecipes, getRandomRecipes } from '../services/spoonacular';

const router = express.Router();

router.get('/recipes/random', async (_req: Request, res: Response) => {
  try {
    const data = await getRandomRecipes();
    res.json(data);
  } catch (err) {
    console.error('Error fetching popular recipes:', err);
    res.status(500).json({ error: 'Error fetching popular recipes' });
  }
});

// GET /api/recipes?q=chicken
router.get('/recipes', async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q as string;
  const offset = parseInt(req.query.offset as string) || 0;

  if (!query) {
    res.status(400).json({ error: 'Missing query param ?q=' });
    return;
  }

  try {
    const data = await searchRecipes(query, offset);
    res.json(data);
  } catch (err) {
    console.error('Error fetching from Spoonacular API:', err);
    res.status(500).json({ error: 'Error fetching from Spoonacular API' });
  }
});

// GET /api/recipes/:id
router.get('/recipes/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  console.log('Fetching recipe by ID:', id);
  if (!id) {
    res.status(400).json({ error: 'Missing recipe ID' }); 
    return;
  }

  try {
    const raw = await getRecipeById(id);

    // Extract calories from nutrients
    const calories = raw.nutrition?.nutrients?.find(
      (n: any) => n.name.toLowerCase() === 'calories'
    )?.amount;
    const protein = raw.nutrition?.nutrients?.find(
      (n: any) => n.name === 'Protein')
      ?.amount;

    const fat = raw.nutrition?.nutrients?.find(
      (n: any) => n.name === 'Fat')
      ?.amount;

    const steps =
      raw.analyzedInstructions?.[0]?.steps?.map((step: any) => step.step) || [];


    const recipe = {
      id: raw.id,
      name: raw.title,
      image: raw.image,
      dishTypes: raw.dishTypes,
      vegetarian: raw.vegetarian,
      vegan: raw.vegan,
      glutenFree: raw.glutenFree,
      dairyFree: raw.dairyFree,
      calories,
      timeToMake: raw.readyInMinutes,
      servings: raw.servings,
      protein,
      fat,
      description: raw.summary,
      ingredients: raw.extendedIngredients?.map((ing: any) => ing.original),
      instructions: raw.instructions,
    };

    res.json(recipe);
  } catch (err) {
    console.error(`Error fetching recipe ${id}:`, err);
    res.status(500).json({ error: 'Error fetching recipe details' });
  }
});

export default router;