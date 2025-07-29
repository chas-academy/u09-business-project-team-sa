import "./HomePage.css";
import SearchRecipeForm from "../../components/forms/SearchRecipeForm";
import RecipeCard from "../../components/cards/RecipeCard";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import ChefMateLogo from "../../../../assets/Chefmate_LOGO.png";
import { useEffect } from "react";
import "../../../../styles/Buttons.css";
import { useHome } from "../../../../context/HomeContext";
import { jwtDecode } from "jwt-decode";

const HomePage = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    meals,
    loading,
    searchTerm,
    offset,
    handleSearch,
    handleClear,
    handleMore,
    handleBack,
  } = useHome();

  interface JwtPayload {
    id: string;
    name: string;
    email: string;
    exp: number;
  }


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    console.log("🔍 Token från URL:", token);


    if (token && !user) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log("✅ Token decoded:", decoded);

        // Spara token och användare
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: decoded.name,
            email: decoded.email,
          })
        );

        login({
          username: decoded.name,
          email: decoded.email,
        });

        navigate("/home", { replace: true });
      } catch (error) {
        console.error("❌ Ogiltig token:", error);
        navigate("/login");
      }
    }
  }, [location.search, user, login, navigate]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleViewProfile = () => {
    navigate("/profile");
  };

  const handleSaveMeal = (mealId: string) => {
    console.log(`Meal ${mealId} saved!`);
  };

  return (
    <div className="homepage">
      <img src={ChefMateLogo} alt="ChefMate Logo" />

      <h2>Welcome, {user?.username ?? "Guest"} 👋</h2>

      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
      <button onClick={handleViewProfile} className="profile-button">
        Profile
      </button>

      <h2>Start searching for recipes</h2>

      <SearchRecipeForm onSearch={handleSearch} onClear={handleClear} />

      {loading ? (
        <p>Loading meals...</p>
      ) : (
        <RecipeCard
          title={
            searchTerm
              ? `${
                  searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)
                } Meals`
              : "Popular Meals"
          }
          meals={meals.map((m) => ({
            id: m.id.toString(),
            name: m.title ?? m.name ?? "Untitled Meal",
            image: m.image,
          }))}
          onSave={handleSaveMeal}
          onMore={handleMore}
          onBack={handleBack}
          searchTerm={searchTerm}
          offset={offset}
        />
      )}
    </div>
  );
};

export default HomePage;
