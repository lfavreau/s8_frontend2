import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import RecipeDetail from "../components/RecipeDetail.jsx";
import { server } from "../mocks/server.js";

test("muestra mensaje inicial si no hay receta seleccionada", () => {
  render(<RecipeDetail recipeId={null} onSaveRecipe={jest.fn()} />);

  expect(screen.getByText("Selecciona una receta para ver su detalle.")).toBeInTheDocument();
});

test("muestra estado de carga al seleccionar receta", () => {
  render(<RecipeDetail recipeId="1" onSaveRecipe={jest.fn()} />);

  expect(screen.getByText("Cargando detalle...")).toBeInTheDocument();
});

test("muestra detalle de receta desde GraphQL mock", async () => {
  render(<RecipeDetail recipeId="1" onSaveRecipe={jest.fn()} />);

  expect(await screen.findByText("Pastel de choclo")).toBeInTheDocument();
  expect(screen.getByText("Tiempo de cocción: 60 minutos")).toBeInTheDocument();
  expect(screen.getByText("Choclo")).toBeInTheDocument();
  expect(screen.getByText(/preparar el pino/i)).toBeInTheDocument();
});

test("muestra ingredientes como lista", async () => {
  render(<RecipeDetail recipeId="1" onSaveRecipe={jest.fn()} />);

  await screen.findByText("Pastel de choclo");

  const ingredientsList = screen.getByRole("list");
  expect(ingredientsList).toBeInTheDocument();
  expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
});

test("muestra secciones de Ingredientes y Preparación", async () => {
  render(<RecipeDetail recipeId="1" onSaveRecipe={jest.fn()} />);

  await screen.findByText("Pastel de choclo");

  expect(screen.getByText("Ingredientes")).toBeInTheDocument();
  expect(screen.getByText("Preparación")).toBeInTheDocument();
});

test("permite guardar receta desde el detalle", async () => {
  const onSaveRecipe = jest.fn();
  const user = userEvent.setup();

  render(<RecipeDetail recipeId="2" onSaveRecipe={onSaveRecipe} />);

  await screen.findByText("Ensalada chilena");

  await user.click(screen.getByText("Guardar receta"));

  expect(onSaveRecipe).toHaveBeenCalledWith(
    expect.objectContaining({
      id: "2",
      title: "Ensalada chilena"
    })
  );
});

test("muestra error cuando GraphQL responde con errores (receta no encontrada)", async () => {
  render(<RecipeDetail recipeId="999" onSaveRecipe={jest.fn()} />);

  expect(await screen.findByText("No se pudo cargar el detalle")).toBeInTheDocument();
});

test("muestra error cuando falla el endpoint GraphQL con 500", async () => {
  server.use(
    http.post("*/graphql", () => {
      return HttpResponse.json({ message: "Error" }, { status: 500 });
    })
  );

  render(<RecipeDetail recipeId="1" onSaveRecipe={jest.fn()} />);

  expect(await screen.findByText("No se pudo cargar el detalle")).toBeInTheDocument();
});

test("limpia el estado al cambiar de receta", async () => {
  const { rerender } = render(<RecipeDetail recipeId="1" onSaveRecipe={jest.fn()} />);

  await screen.findByText("Pastel de choclo");

  rerender(<RecipeDetail recipeId="2" onSaveRecipe={jest.fn()} />);

  expect(await screen.findByText("Ensalada chilena")).toBeInTheDocument();
  expect(screen.queryByText("Pastel de choclo")).not.toBeInTheDocument();
});
