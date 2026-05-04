import { useEffect, useMemo, useState } from "react";
import { getRecipes } from "../services/recipeApi.js";
import RecipeCard from "./RecipeCard.jsx";
import CategoryFilter from "./CategoryFilter.jsx";

function RecipeList({ onSelectRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecipes()
      .then(setRecipes)
      .catch(() => setError("Error al cargar recetas"))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    return [...new Set(recipes.map((recipe) => recipe.category))];
  }, [recipes]);

  const filteredRecipes =
    selectedCategory === "Todas"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory);

  if (loading) return <p className="status-msg">Cargando recetas...</p>;
  if (error) return <p className="status-error">{error}</p>;

  return (
    <section>
      <h2>Recetas disponibles</h2>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChangeCategory={setSelectedCategory}
      />

      <div className="grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={onSelectRecipe} />
        ))}
      </div>
    </section>
  );
}

export default RecipeList;
