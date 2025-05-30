import '../../pages/Home/HomePage.css'
import { useState } from 'react';

type Props = {
  onSearch: (query: string) => void;
  onClear: () => void;
};

const SearchRecipeForm = ({ onSearch, onClear }: Props) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input.trim());
        }
    };

    const handleClear = async () => {
        setInput('');
        onClear();
    };
 
    return (
        <div className='seachform-container'>
        <form className="searchrecipe-form" onSubmit={handleSubmit}>
            <div className='search-wrapper'>
            <input 
                placeholder="search for recipes.."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
        
        <button className="search-recipe-button" type="submit">
          Search
        </button>

        <button type="button" 
                className="clear-button"
                onClick={handleClear}
            >
          Clear
        </button>

        </div>
        </form>
        </div>
    );
};

export default SearchRecipeForm;