import { Request, Response } from "express";
// import User from "../models/userModel";
import MealPlan from "../models/userMealPlans";
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';

export const saveMealPlan = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    console.log("Save meal plan route triggered");
    console.log("User ID:", req.user?._id);
    console.log("Plan received:", JSON.stringify(req.body.plan, null, 2));

    // if (!req.user?._id) return res.status(401).json({ error: "Unauthorized" });

    const existing = await MealPlan.findOne({ userId: req.user!._id });

    if (existing) {
      existing.plan = req.body.plan;
      await existing.save();
      console.log("Updated meal plan in DB");
    } else {
      await MealPlan.create({
        userId: req.user!._id,
        plan: req.body.plan,
      });
      console.log("Incoming meal plan:", req.body.plan);
    }

    res.status(200).json({ message: "Meal plan saved!" });
  } catch (error) {
    console.error("Error saving meal plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const saveMealPlan = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//   try {
//     const user = await User.findById(req.user!._id);

//     if (!user) {
//         res.status(404).json({ message: "User not found" });
//         return;
//     }

//     user.mealPlan = req.body.plan;
//     await user.save();

//     res.status(200).json({ message: "Meal plan saved!" });
//   } catch (error) {
//     console.error("Error saving meal plan:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


