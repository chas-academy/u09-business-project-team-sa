import { Request, Response } from "express";
import User from "../models/userModel";
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';

export const saveMealPlan = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user!._id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    user.mealPlan = req.body.plan;
    await user.save();

    res.status(200).json({ message: "Meal plan saved!" });
  } catch (error) {
    console.error("Error saving meal plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};


