function getDifficultyClass(difficulty) {
  const map = { "Fácil": "facil", "Media": "media", "Difícil": "dificil" };
  return map[difficulty] || "";
}

function RecipeCard({ recipe, onSelectRecipe }) {
  return (
    <article
      className="card"
      style={recipe.image ? { backgroundImage: `url(${recipe.image})` } : {}}
    >
      <div className="card-overlay">
        <div className="card-content">
          <h2>{recipe.title}</h2>
          <p className="card-category">Categoría: {recipe.category}</p>
          <p className="card-difficulty">
            <span className={`card-badge ${getDifficultyClass(recipe.difficulty)}`}>
              Dificultad: {recipe.difficulty}
            </span>
          </p>
          <button
            type="button"
            className="btn-detail"
            onClick={() => onSelectRecipe(recipe.id)}
          >
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
