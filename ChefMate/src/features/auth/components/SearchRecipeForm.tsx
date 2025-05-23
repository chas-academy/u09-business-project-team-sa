import '../pages/Home/HomePage.css'

const SearchRecipeForm = () => {
    return (
        <form className="searchrecipe-form">
            <input placeholder="search for recipes.."/>
        
        <button className="search-recipe-button">
          Search
        </button>
        </form>
    );
};

export default SearchRecipeForm;