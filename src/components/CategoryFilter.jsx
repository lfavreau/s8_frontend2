function CategoryFilter({ categories, selectedCategory, onChangeCategory }) {
  return (
    <div className="filter-container">
      <span className="filter-label">Filtrar por categoría:</span>
      <label htmlFor="category-select" className="visually-hidden">
        Filtrar por categoría
      </label>
      <select
        id="category-select"
        aria-label="Filtrar por categoría"
        value={selectedCategory}
        onChange={(event) => onChangeCategory(event.target.value)}
      >
        <option value="Todas">Todas</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
