function SavedRecipes({ recipes }) {
  return (
    <section className="saved">
      <h2>Recetas guardadas</h2>

      {recipes.length === 0 ? (
        <p className="saved-empty">No hay recetas guardadas.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SavedRecipes;
