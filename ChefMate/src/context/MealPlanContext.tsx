import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export type MealSlot = {
  id: string;
  name: string;
  image?: string;
};

export type MealPlan = {
  [day: string]: {
    [meal: string]: MealSlot[];
  };
};

const defaultMealPlan: MealPlan = daysOfWeek.reduce((acc, day) => {
  acc[day] = meals.reduce((acc2, meal) => {
    acc2[meal] = [];
    return acc2;
  }, {} as Record<string, MealSlot[]>);
  return acc;
}, {} as MealPlan);

const MealPlanContext = createContext<{
  mealPlan: MealPlan;
  addMealToPlan: (day: string, mealType: string, meal: MealSlot) => void;
} & { fetchMealPlan: () => void }>({
  mealPlan: defaultMealPlan,
  addMealToPlan: () => {},
  fetchMealPlan() {},
});

export const MealPlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mealPlan, setMealPlan] = useState<MealPlan>(defaultMealPlan);

  const fetchMealPlan = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await api.get('/mealplan', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const dbPlan = res.data?.plan || {}; // Your backend sends { plan: {...} }

    const filledPlan: MealPlan = daysOfWeek.reduce((acc, day) => {
      acc[day] = meals.reduce((acc2, meal) => {
        const slot = dbPlan?.[day]?.[meal];

        // Ensure every slot is an array
        if (Array.isArray(slot)) {
          acc2[meal] = slot.map((m: any) => ({
            id: m.id,
            name: m.name || m.title || 'Unnamed',
            image: m.image || '',
          }));
        } else if (typeof slot === 'object' && slot !== null) {
          acc2[meal] = [{
            id: slot.id,
            name: slot.name || slot.title || 'Unnamed',
            image: slot.image || '',
          }];
        } else {
          acc2[meal] = [];
        }

        return acc2;
      }, {} as Record<string, MealSlot[]>);
      return acc;
    }, {} as MealPlan);

    setMealPlan(filledPlan);
  } catch (error: any) {
  if (error.response) {
    console.error('❌ Failed to fetch meal plan - Server responded with:', error.response.status, error.response.data);
  } else if (error.request) {
    console.error('❌ Failed to fetch meal plan - No response received:', error.request);
  } else {
    console.error('❌ Failed to fetch meal plan - Other error:', error.message);
  }
}};

      useEffect(() => {
        fetchMealPlan();
      }, []);

  const normalizeMealType = (type: string) =>
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

  const addMealToPlan = async (day: string, mealType: string, meal: MealSlot) => {
    const normalizedType = normalizeMealType(mealType);

    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    console.log('Token:', token);  // debug check for token
    if (!token) return;

  setMealPlan(prev => {
    const updated = { ...prev };

    if (!updated[day]) {
      updated[day] = { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] };
    }

    if (!updated[day][normalizedType]) {
      updated[day][normalizedType] = [];
    }

    // Prevent duplicates by ID
    const alreadyExists = updated[day][normalizedType].some(m => m.id === meal.id);
    if (!alreadyExists) {
    updated[day][normalizedType].push(meal);
    }

    // Send only the new slot update to backend
    const singleSlotUpdate = {
      [day]: {
        [normalizedType]: updated[day][normalizedType],
      },
    };

    api.post('/mealplan', { plan: singleSlotUpdate }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      console.log('Meal plan saved to backend!');
    }).catch((error) => {
      console.error('Error saving meal to backend:', error);
    });

    return updated;
  });
};

  return (
    <MealPlanContext.Provider value={{ mealPlan, addMealToPlan, fetchMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = () => useContext(MealPlanContext);