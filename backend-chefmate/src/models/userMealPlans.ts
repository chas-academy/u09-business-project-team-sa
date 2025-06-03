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
    type: Map,
    of: new mongoose.Schema({
      type: Map,
      of: [MealSlotSchema]
    }),
    required: true,
  },
});

export default mongoose.model('MealPlan', MealPlanSchema);