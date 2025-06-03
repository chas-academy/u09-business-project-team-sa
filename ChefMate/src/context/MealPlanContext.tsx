import React, { createContext, useContext, useState } from 'react';
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
}>({
  mealPlan: defaultMealPlan,
  addMealToPlan: () => {},
});

export const MealPlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mealPlan, setMealPlan] = useState<MealPlan>(defaultMealPlan);

  const addMealToPlan = async (day: string, mealType: string, meal: MealSlot) => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    console.log('Token:', token);  // debug check for token

  setMealPlan(prev => {
    const updated = { ...prev };

    if (!updated[day]) updated[day] = { breakfast: [], lunch: [], dinner: [], snacks: [] };
    if (!updated[day][mealType]) updated[day][mealType] = [];
    
    updated[day][mealType].push(meal);

    api.post('/mealplan', { plan: updated }, {
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
    <MealPlanContext.Provider value={{ mealPlan, addMealToPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = () => useContext(MealPlanContext);

 // const addMealToPlan = (day: string, mealType: string, meal: MealSlot) => {
  //   setMealPlan((prev) => ({
  //     ...prev,
  //     [day]: {
  //       ...prev[day],
  //       [mealType]: [...prev[day][mealType], meal],
  //     },
  //   }));
  // };

  //   try {
//     const token = localStorage.getItem('token');
//     const updatedPlan = {
//       ...mealPlan,
//       [day]: {
//         ...mealPlan[day],
//         [mealType]: [...mealPlan[day][mealType], meal],
//       },
//     };

//     await api.post('/user/mealplan', { plan: updatedPlan }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log('Meal plan saved to backend!');
//   } catch (error) {
//     console.error('Error saving meal plan to backend:', error);
//   }
// };