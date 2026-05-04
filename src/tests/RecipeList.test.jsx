import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import RecipeList from "../components/RecipeList.jsx";
import { server } from "../mocks/server.js";

test("muestra estado de carga inicial", () => {
  render(<RecipeList onSelectRecipe={jest.fn()} />);

  expect(screen.getByText("Cargando recetas...")).toBeInTheDocument();
});

test("muestra la lista de recetas desde la API REST mock", async () => {
  render(<RecipeList onSelectRecipe={jest.fn()} />);

  expect(await screen.findByText("Pastel de choclo")).toBeInTheDocument();
  expect(screen.getByText("Ensalada chilena")).toBeInTheDocument();
  expect(screen.getByText("Leche asada")).toBeInTheDocument();
});

test("muestra el título 'Recetas disponibles'", async () => {
  render(<RecipeList onSelectRecipe={jest.fn()} />);

  await screen.findByText("Pastel de choclo");

  expect(screen.getByText("Recetas disponibles")).toBeInTheDocument();
});

test("muestra el filtro de categorías", async () => {
  render(<RecipeList onSelectRecipe={jest.fn()} />);

  await screen.findByText("Pastel de choclo");

  expect(screen.getByRole("combobox")).toBeInTheDocument();
});

test("filtra recetas por categoría Postres", async () => {
  const user = userEvent.setup();

  render(<RecipeList onSelectRecipe={jest.fn()} />);

  await screen.findByText("Pastel de choclo");

  await user.selectOptions(screen.getByRole("combobox"), "Postres");

  expect(screen.getByText("Leche asada")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText("Pastel de choclo")).not.toBeInTheDocument();
  });
});

test("filtra recetas por categoría Ensaladas", async () => {
  const user = userEvent.setup();

  render(<RecipeList onSelectRecipe={jest.fn()} />);

  await screen.findByText("Ensalada chilena");

  await user.selectOptions(screen.getByRole("combobox"), "Ensaladas");

  expect(screen.getByText("Ensalada chilena")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText("Leche asada")).not.toBeInTheDocument();
  });
});

test("vuelve a mostrar todas las recetas al seleccionar 'Todas'", async () => {
  const user = userEvent.setup();

  render(<RecipeList onSelectRecipe={jest.fn()} />);

  await screen.findByText("Pastel de choclo");

  await user.selectOptions(screen.getByRole("combobox"), "Postres");
  await user.selectOptions(screen.getByRole("combobox"), "Todas");

  expect(screen.getByText("Pastel de choclo")).toBeInTheDocument();
  expect(screen.getByText("Ensalada chilena")).toBeInTheDocument();
  expect(screen.getByText("Leche asada")).toBeInTheDocument();
});

test("ejecuta selección de receta al hacer click en 'Ver detalle'", async () => {
  const onSelectRecipe = jest.fn();
  const user = userEvent.setup();

  render(<RecipeList onSelectRecipe={onSelectRecipe} />);

  await screen.findByText("Pastel de choclo");

  await user.click(screen.getAllByText("Ver detalle")[0]);

  expect(onSelectRecipe).toHaveBeenCalledWith("1");
});

test("muestra error si falla la API REST con 500", async () => {
  server.use(
    http.get("*/api/recipes", () => {
      return HttpResponse.json({ message: "Error" }, { status: 500 });
    })
  );

  render(<RecipeList onSelectRecipe={jest.fn()} />);

  expect(await screen.findByText("Error al cargar recetas")).toBeInTheDocument();
});
