import { render, screen } from "@testing-library/react";
import SavedRecipes from "../components/SavedRecipes.jsx";

test("muestra mensaje cuando no hay recetas guardadas", () => {
  render(<SavedRecipes recipes={[]} />);

  expect(screen.getByText("No hay recetas guardadas.")).toBeInTheDocument();
});

test("muestra el título 'Recetas guardadas'", () => {
  render(<SavedRecipes recipes={[]} />);

  expect(screen.getByRole("heading", { name: /recetas guardadas/i })).toBeInTheDocument();
});

test("muestra recetas guardadas en lista", () => {
  render(
    <SavedRecipes
      recipes={[
        { id: "1", title: "Pastel de choclo" },
        { id: "2", title: "Ensalada chilena" }
      ]}
    />
  );

  expect(screen.getByText("Pastel de choclo")).toBeInTheDocument();
  expect(screen.getByText("Ensalada chilena")).toBeInTheDocument();
});

test("no muestra el mensaje vacío cuando hay recetas", () => {
  render(
    <SavedRecipes
      recipes={[{ id: "1", title: "Pastel de choclo" }]}
    />
  );

  expect(screen.queryByText("No hay recetas guardadas.")).not.toBeInTheDocument();
});

test("muestra múltiples recetas guardadas correctamente", () => {
  const recipes = [
    { id: "1", title: "Pastel de choclo" },
    { id: "2", title: "Ensalada chilena" },
    { id: "3", title: "Leche asada" }
  ];

  render(<SavedRecipes recipes={recipes} />);

  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(3);
});
