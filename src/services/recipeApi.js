export async function getRecipes() {
  const response = await fetch("/api/recipes");

  if (!response.ok) {
    throw new Error("No se pudieron cargar las recetas");
  }

  return response.json();
}
