import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  id: String,
  name: String,
  // title: String,
  image: String,
});

const daySchema = new mongoose.Schema({
  Breakfast: [mealSchema],
  Lunch: [mealSchema],
  Dinner: [mealSchema],
  Snacks: [mealSchema],
});

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  plan: {
    Monday: daySchema,
    Tuesday: daySchema,
    Wednesday: daySchema,
    Thursday: daySchema,
    Friday: daySchema,
    Saturday: daySchema,
    Sunday: daySchema,
  },
});

export default mongoose.model('MealPlan', mealPlanSchema);