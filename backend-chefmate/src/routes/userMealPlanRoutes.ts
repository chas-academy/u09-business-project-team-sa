import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/userModel';
import MealPlan from '../models/userMealPlans';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';
import { saveMealPlan, getMealPlan } from "../controllers/userMealPlanController";

const router = express.Router();

console.log("✅ userMealPlanRoutes loaded");

// router.get('/', authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//   try {
//     // const plan = await MealPlan.findById({ userId: req.user!._id });
//     const plan = await MealPlan.findOne({ userId: req.user!._id });

//     if (!plan) {
//       res.status(404).json({ message: 'Meal plan not found' });
//       return;
//     }

//     res.json(plan);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Create or update meal plan
router.post('/', authMiddleware, saveMealPlan);
router.get('/', authMiddleware, getMealPlan);
// router.post('/', authMiddleware, (req, res) => {
//   console.log("POST /api/mealplan hit!");
//   res.json({ message: "Post route working" });
// });

// debug / test
console.log("✅ Inside userMealPlanRoutes setup");

router.post('/test', (req: Request, res: Response) => {
  console.log("✅ /test route hit!");
  res.send("Test route works!");
});


export default router;
