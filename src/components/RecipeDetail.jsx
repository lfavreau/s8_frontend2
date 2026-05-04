import { useEffect, useState } from "react";
import { getRecipeDetail } from "../services/recipeGraphql.js";

function RecipeDetail({ recipeId, onSaveRecipe }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!recipeId) return;

    let isActive = true;

    setRecipe(null);
    setLoading(true);
    setError("");

    getRecipeDetail(recipeId)
      .then((recipeDetail) => {
        if (isActive) setRecipe(recipeDetail);
      })
      .catch(() => {
        if (isActive) setError("No se pudo cargar el detalle");
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [recipeId]);

  if (!recipeId) {
    return (
      <div className="detail-empty">
        <p>Selecciona una receta para ver su detalle.</p>
      </div>
    );
  }

  if (loading) return <p className="status-msg">Cargando detalle...</p>;
  if (error) return <p className="status-error">{error}</p>;
  if (!recipe) return null;

  return (
    <section className="detail">
      <h2>{recipe.title}</h2>
      <p className="detail-meta">Tiempo de cocción: {recipe.time}</p>

      <h3>Ingredientes</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

      <h3>Preparación</h3>
      <p>{recipe.preparation}</p>

      <button type="button" className="btn-save" onClick={() => onSaveRecipe(recipe)}>
        Guardar receta
      </button>
    </section>
  );
}

export default RecipeDetail;
