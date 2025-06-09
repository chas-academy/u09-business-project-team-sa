import mongoose from 'mongoose';
//new
const mealSchema = new mongoose.Schema({
  id: String,
  title: String,
  // add other meal properties you may be using
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

// this was all before
// const MealSlotSchema = new mongoose.Schema({
//   id: String,
//   name: String,
//   image: String,
// });

// const MealPlanSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true,
//     unique: true,
//   },
//   plan: {
//     Monday: { type: Object, default: {} },
//     Tuesday: { type: Object, default: {} },
//     Wednesday: { type: Object, default: {} },
//     Thursday: { type: Object, default: {} },
//     Friday: { type: Object, default: {} },
//     Saturday: { type: Object, default: {} },
//     Sunday: { type: Object, default: {} },
//   },
// });

export default mongoose.model('MealPlan', mealPlanSchema);