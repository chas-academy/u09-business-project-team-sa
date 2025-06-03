import './FavoritesCard.css'
import React from "react";

interface Meal {
  id: string;
  title: string;
  image?: string;
  description?: string;
}

interface FavoritesCardProps {
  favorites: Meal[];
  onRemoveFavorite?: (id: string) => void;
}

const FavoritesCard: React.FC<FavoritesCardProps> = ({ favorites, onRemoveFavorite }) => {
  return (
    <div className="mt-6 p-4 bg-white shadow-lg rounded-2xl w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">⭐ Favorite Meals</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">You haven't saved any meals yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((meal) => (
            <li key={meal.id} className="bg-gray-50 p-4 rounded-xl shadow flex flex-col items-start">
              {meal.image && (
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
              )}
              <h3 className="text-lg font-medium">{meal.title}</h3>
              {meal.description && <p className="text-sm text-gray-600 mt-1">{meal.description}</p>}
              {onRemoveFavorite && (
                <button
                  onClick={() => onRemoveFavorite(meal.id)}
                  className="mt-2 text-sm text-red-500 hover:underline self-end"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesCard;