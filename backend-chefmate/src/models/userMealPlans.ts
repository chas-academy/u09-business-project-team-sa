import mongoose from 'mongoose';

const MealSlotSchema = new mongoose.Schema({
  id: String,
  name: String,
  image: String,
});

const MealPlanSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true,
  },
  plan: {
    Monday: { type: Object, default: {} },
    Tuesday: { type: Object, default: {} },
    Wednesday: { type: Object, default: {} },
    Thursday: { type: Object, default: {} },
    Friday: { type: Object, default: {} },
    Saturday: { type: Object, default: {} },
    Sunday: { type: Object, default: {} },
    // Monday: { Breakfast: [MealSlotSchema], Lunch: [MealSlotSchema], Dinner: [MealSlotSchema], Snacks: [MealSlotSchema] },
    // Tuesday: { Breakfast: [MealSlotSchema], Lunch: [MealSlotSchema], Dinner: [MealSlotSchema], Snacks: [MealSlotSchema] },
    // Wednesday: { Breakfast: [MealSlotSchema], Lunch: [MealSlotSchema], Dinner: [MealSlotSchema], Snacks: [MealSlotSchema] },
    // Thursday: { Breakfast: [MealSlotSchema], Lunch: [MealSlotSchema], Dinner: [MealSlotSchema], Snacks: [MealSlotSchema] },
    // Friday: { Breakfast: [MealSlotSchema], Lunch: [MealSlotSchema], Dinner: [MealSlotSchema], Snacks: [MealSlotSchema] },
    // Saturday: { Breakfast: [MealSlotSchema], Lunch: [MealSlotSchema], Dinner: [MealSlotSchema], Snacks: [MealSlotSchema] },
    // Sunday: { Breakfast: [MealSlotSchema], Lunch: [MealSlotSchema], Dinner: [MealSlotSchema], Snacks: [MealSlotSchema] },
  },
});

export default mongoose.model('MealPlan', MealPlanSchema);