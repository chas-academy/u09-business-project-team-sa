import { Request, Response } from "express";
import MealPlan from "../models/userMealPlans";
import { AuthenticatedRequest } from '../middleware/auth';
import mongoose from "mongoose";

// Normalize a single meal
const normalizeMeal = (meal: any) => ({
  id: meal.id,
  name: meal.title || meal.name || 'Unnamed',
  image: meal.image || '', // Optional
});

// Normalize the entire plan
const normalizeIncomingPlan = (plan: any) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const normalizedPlan: any = {};

  for (const day of days) {
    normalizedPlan[day] = {};

    for (const meal of meals) {
      const original = plan?.[day]?.[meal] || [];
      normalizedPlan[day][meal] = Array.isArray(original)
        ? original.map(normalizeMeal)
        : [];
    }
  }

  return normalizedPlan;
};


// Default meal plan template
export const generateDefaultMealPlan = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  
  const plan: any = {};
  for (const day of days) {
    plan[day] = {};
    for (const meal of meals) {
      plan[day][meal] = [];
    }
  }
  return plan;
};

// Deep merge helper
export const deepMergeMealPlan = (existingPlan: any = {}, incomingPlan: any = {}) => {
  const base = generateDefaultMealPlan();

  for (const day in base) {
    for (const meal of Object.keys(base[day])) {
      const existingMeals = Array.isArray(existingPlan?.[day]?.[meal]) 
        ? existingPlan[day][meal]
        : [];

      const newMeals = Array.isArray(incomingPlan?.[day]?.[meal]) 
        ? incomingPlan[day][meal]
        : [];

      const uniqueMeals = newMeals.filter(
        (mealItem: any) =>
          !existingMeals.some((existing: any) => existing.id === mealItem.id)
      );

      base[day][meal] = [...existingMeals, ...uniqueMeals];
    }
  }

  return base;
};

export const saveMealPlan = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  console.log("✅ saveMealPlan controller hit");  // 
  const { plan } = req.body;
  
  try {
    console.log("Save meal plan route triggered");
    console.log("User ID:", req.user?._id);
    console.log("Plan received:", JSON.stringify(req.body.plan, null, 2));

    const userId = new mongoose.Types.ObjectId(req.user!._id); 

    const incoming = normalizeIncomingPlan(plan);
    const existing = await MealPlan.findOne({ userId });
    // const incoming = normalizeIncomingPlan(req.body.plan);
    // const existing = await MealPlan.findOne({ userId: req.user!._id });
    
    if (existing) {
      existing.plan = deepMergeMealPlan(existing.plan, incoming);
      console.log("Before save, merged plan:", JSON.stringify(existing.plan, null, 2));
      await existing.save();
      console.log("Updated meal plan in DB");
      console.log("Authenticated user ID:", req.user?._id);
      } else {
      const newPlan = deepMergeMealPlan({}, incoming);
      console.log("Before save, merged plan:", JSON.stringify(newPlan, null, 2));

      await MealPlan.create({
        // userId: req.user!._id,
        userId,
        plan: newPlan,
      });
      console.log("Created new meal plan in DB");
      console.log("MealPlan.create was called successfully");
      }
    
    res.status(200).json({ message: "Meal plan saved!" });
  } catch (error) {
    console.error("Error saving meal plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// get meal plan
  export const getMealPlan = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!._id); // ✅ Ensure it's an ObjectId

    const planDoc = await MealPlan.findOne({ userId });
    // const planDoc = await MealPlan.findOne({ userId: req.user!._id });

    if (!planDoc) {
      res.status(200).json({}); // No plan yet
      return;
    }
const normalizedPlan: any = {};
    const rawPlan = planDoc.plan as Record<string, Record<string, any>>;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    for (const day of days) {
      normalizedPlan[day] = {};
      for (const meal of meals) {
        const slot = rawPlan?.[day]?.[meal];

        if (Array.isArray(slot)) {
          normalizedPlan[day][meal] = slot;
        } else if (typeof slot === 'object' && slot !== null) {
          normalizedPlan[day][meal] = [slot]; // Wrap object in array
        } else {
          normalizedPlan[day][meal] = []; // Empty
        }
      }
    }

    res.status(200).json({ plan: normalizedPlan });
  } catch (error) {
    console.error('Error fetching meal plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
