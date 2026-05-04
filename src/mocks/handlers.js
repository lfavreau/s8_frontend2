import { http, HttpResponse, graphql } from "msw";
import { recipes } from "./data.js";

export const handlers = [
  http.get("*/api/recipes", () => {
    return HttpResponse.json(
      recipes.map(({ id, title, difficulty, category, image }) => ({
        id,
        title,
        difficulty,
        category,
        image
      }))
    );
  }),

  graphql.link("*/graphql").query("GetRecipeDetail", ({ variables }) => {
    const recipe = recipes.find((item) => item.id === variables.id);

    if (!recipe) {
      return HttpResponse.json({
        errors: [{ message: "Receta no encontrada" }]
      });
    }

    return HttpResponse.json({
      data: {
        recipe
      }
    });
  })
];
