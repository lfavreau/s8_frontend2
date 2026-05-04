import { useState } from "react";
import RecipeList from "./components/RecipeList.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import SavedRecipes from "./components/SavedRecipes.jsx";
function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  function handleSaveRecipe(recipe) {
    setSavedRecipes((current) => {
      const alreadySaved = current.some((item) => item.id === recipe.id);
      return alreadySaved ? current : [...current, recipe];
    });
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Base de datos de recetas</h1>
        <p className="subtitle">Explora, filtra y guarda tus recetas favoritas</p>
      </header>

      <section className="layout">
        <div className="recipe-list-panel">
          <RecipeList onSelectRecipe={setSelectedRecipeId} />
        </div>

        <div className="right-panel">
          <RecipeDetail recipeId={selectedRecipeId} onSaveRecipe={handleSaveRecipe} />
          <SavedRecipes recipes={savedRecipes} />
        </div>
      </section>
    </main>
  );
}

export default App;
