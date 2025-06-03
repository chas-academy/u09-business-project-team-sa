import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/userModel';
// import MealPlan from '../models/userMealPlans';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';
import { saveMealPlan } from "../controllers/userMealPlanController";

const router = express.Router();

console.log("✅ userMealPlanRoutes loaded");

router.get('/', authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user!._id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user.mealPlan);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update meal plan
// router.post('/', authMiddleware, saveMealPlan); swap this back
router.post('/', authMiddleware, (req, res) => {
  console.log("POST /api/mealplan hit!");
  res.json({ message: "Post route working" });
});

// debug / test
console.log("✅ Inside userMealPlanRoutes setup");

router.post('/test', (req: Request, res: Response) => {
  console.log("✅ /test route hit!");
  res.send("Test route works!");
});


export default router;
