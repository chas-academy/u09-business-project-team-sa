import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '../api/axios';
import mockMeals from '../mocks/mockMeals';

type Meal = {
  id: string;
  title?: string;
  name?: string;
  image?: string;
};

interface HomeContextType {
  meals: Meal[];
  loading: boolean;
  searchTerm: string;
  offset: number;
  handleSearch: (query: string) => Promise<void>;
  handleClear: () => Promise<void>;
  handleMore: () => Promise<void>;
  handleBack: () => Promise<void>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0); // for search pagination
  // const [randomFetchCount, setRandomFetchCount] = useState(0); 

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    setOffset(0);
    setLoading(true);
    try {
      const res = await api.get(`spoonacular/recipes?q=${query}&offset=0`);
      setMeals(res.data.results);
    } catch (err) {
      console.error('Search failed, using mock data:', err);
      setMeals(mockMeals);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
  setSearchTerm('');
  setLoading(true);
  try {
    const res = await api.get('/meals/popular');
    setMeals(res.data);
  } catch (err) {
    console.error('Failed to fetch popular meals', err);
    setMeals(mockMeals);
  } finally {
    setLoading(false);
  }
};

  const handleMore = async () => {
  setLoading(true);
  try {
    if (searchTerm) {
      const newOffset = offset + 6;
      const res = await api.get(`spoonacular/recipes?q=${searchTerm}&offset=${newOffset}`);
      setOffset(newOffset);
      setMeals((prev) => [...prev, ...res.data.results]);
    } else {
      const res = await api.get('spoonacular/recipes/random');
      setMeals(res.data.recipes);
    }
  } catch (err) {
    console.error('Failed to load more meals', err);
    setMeals(mockMeals);
  } finally {
    setLoading(false);
  }
};

  const handleBack = async () => {
  if (searchTerm && offset >= 6) {
    const newOffset = offset - 6;
    setOffset(newOffset);
    setLoading(true);
    try {
      const res = await api.get(`spoonacular/recipes?q=${searchTerm}&offset=${newOffset}`);
      setMeals(res.data.results);
    } catch (err) {
      console.error('Failed to go back in results', err);
    } finally {
      setLoading(false);
    }
  }
};

useEffect(() => {
  const fetchRandomMeals = async () => {
    try {
      const res = await api.get('spoonacular/recipes/random');
      if (res.data.recipes) {
      setMeals(res.data.recipes);
      } else {
        console.warn('No random recipes fonud in response', res.data);
        setMeals([]);
      }
    } catch (err) {
      console.error('Failed to fetch random meals', err);
      setMeals(mockMeals);
    } finally {
      setLoading(false);
    }
  };
  fetchRandomMeals();
}, []);

  return (
    <HomeContext.Provider value={{ 
      meals, loading, searchTerm, offset,
      handleBack, handleClear, handleMore, handleSearch 
    }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) throw new Error("useHome must be used within a HomeProvider");
  return context;
};