import '../pages/Home/HomePage.css'
import { useState } from 'react';

type Props = {
  onSearch: (query: string) => void;
};

const SearchRecipeForm = ({ onSearch }: Props) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input.trim());
        }
    };

    return (
        <form className="searchrecipe-form" onSubmit={handleSubmit}>
            <input 
                placeholder="search for recipes.."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
        
        <button className="search-recipe-button" type="submit">
          Search
        </button>
        </form>
    );
};

export default SearchRecipeForm;