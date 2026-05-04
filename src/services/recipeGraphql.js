export async function getRecipeDetail(id) {
  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        query GetRecipeDetail($id: ID!) {
          recipe(id: $id) {
            id
            title
            difficulty
            category
            time
            ingredients
            preparation
          }
        }
      `,
      variables: { id }
    })
  });

  if (!response.ok) {
    throw new Error("No se pudo cargar el detalle de la receta");
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.recipe;
}
