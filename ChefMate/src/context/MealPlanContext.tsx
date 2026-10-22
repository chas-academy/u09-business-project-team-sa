import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];

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

type BackendMeal = {
  id: string;
  name?: string;
  title?: string;
  image?: string;
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
  fetchMealPlan: () => void;
}>({
  mealPlan: defaultMealPlan,
  addMealToPlan: () => {},
  fetchMealPlan() {},
});

export const MealPlanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mealPlan, setMealPlan] = useState<MealPlan>(defaultMealPlan);

  // Läs mealPlan från localStorage vid start
  useEffect(() => {
    const storedPlan = localStorage.getItem("mealPlan");
    if (storedPlan) {
      try {
        setMealPlan(JSON.parse(storedPlan));
      } catch {
        // om fel i parsing, ta bort
        localStorage.removeItem("mealPlan");
      }
    } else {
      // Om inget i localStorage, hämta från backend
      fetchMealPlan();
    }
  }, []);

  // Spara mealPlan i localStorage varje gång den ändras
  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  const fetchMealPlan = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await api.get("/mealplan", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const dbPlan = res.data?.plan || {};

      const filledPlan: MealPlan = daysOfWeek.reduce((acc, day) => {
        acc[day] = meals.reduce((acc2, meal) => {
          const slot = dbPlan?.[day]?.[meal];

          if (Array.isArray(slot)) {
            acc2[meal] = slot.map((m: BackendMeal) => ({
              id: m.id,
              name: m.name || m.title || "Unnamed",
              image: m.image || "",
            }));
          } else if (typeof slot === "object" && slot !== null) {
            acc2[meal] = [
              {
                id: slot.id,
                name: slot.name || slot.title || "Unnamed",
                image: slot.image || "",
              },
            ];
          } else {
            acc2[meal] = [];
          }
          return acc2;
        }, {} as Record<string, MealSlot[]>);
        return acc;
      }, {} as MealPlan);

      setMealPlan(filledPlan);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          "❌ Failed to fetch meal plan - Error message:",
          error.message
        );
      } else {
        console.error("❌ Failed to fetch meal plan - Unknown error:", error);
      }
    }
  };

  const normalizeMealType = (type: string) =>
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

  const addMealToPlan = async (
    day: string,
    mealType: string,
    meal: MealSlot
  ) => {
    const normalizedType = normalizeMealType(mealType);

    const token = localStorage.getItem("token");
    if (!token) return;

    setMealPlan((prev) => {
      const updated = { ...prev };

      if (!updated[day]) {
        updated[day] = { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] };
      }

      if (!updated[day][normalizedType]) {
        updated[day][normalizedType] = [];
      }

      const alreadyExists = updated[day][normalizedType].some(
        (m) => m.id === meal.id
      );
      if (!alreadyExists) {
        updated[day][normalizedType].push(meal);
      }

      const singleSlotUpdate = {
        [day]: {
          [normalizedType]: updated[day][normalizedType],
        },
      };

      api
        .post(
          "/mealplan",
          { plan: singleSlotUpdate },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          console.log("Meal plan saved to backend!");
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            console.error("Error saving meal to backend:", error.message);
          } else {
            console.error("Unknown error saving meal to backend:", error);
          }
        });

      return updated;
    });
  };

  return (
    <MealPlanContext.Provider
      value={{ mealPlan, addMealToPlan, fetchMealPlan }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = () => useContext(MealPlanContext);
