import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/userModel';
import MealPlan from '../models/userMealPlans';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';
import { saveMealPlan, getMealPlan } from "../controllers/userMealPlanController";

const router = express.Router();

console.log("✅ userMealPlanRoutes loaded");

// Create or update meal plan
router.post('/', authMiddleware, saveMealPlan);
router.get('/', authMiddleware, getMealPlan);

// debug / test
console.log("✅ Inside userMealPlanRoutes setup");

router.post('/test', (req: Request, res: Response) => {
  console.log("✅ /test route hit!");
  res.send("Test route works!");
});


export default router;
