import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecipeCard from "../components/RecipeCard.jsx";

const mockRecipe = {
  id: "1",
  title: "Pastel de choclo",
  difficulty: "Media",
  category: "Platos principales",
  image: "/images/pastel_de_choclo.jpg"
};

test("renderiza título, dificultad y categoría", () => {
  render(<RecipeCard recipe={mockRecipe} onSelectRecipe={jest.fn()} />);

  expect(screen.getByText("Pastel de choclo")).toBeInTheDocument();
  expect(screen.getByText(/dificultad:\s*media/i)).toBeInTheDocument();
  expect(screen.getByText(/platos principales/i)).toBeInTheDocument();
});

test("llama a onSelectRecipe con el id al hacer click en 'Ver detalle'", async () => {
  const onSelectRecipe = jest.fn();
  const user = userEvent.setup();

  render(<RecipeCard recipe={mockRecipe} onSelectRecipe={onSelectRecipe} />);

  await user.click(screen.getByText("Ver detalle"));

  expect(onSelectRecipe).toHaveBeenCalledWith("1");
});

test("aplica clase 'facil' para dificultad Fácil", () => {
  render(
    <RecipeCard
      recipe={{ ...mockRecipe, difficulty: "Fácil" }}
      onSelectRecipe={jest.fn()}
    />
  );

  const badge = screen.getByText(/dificultad:\s*fácil/i);
  expect(badge).toHaveClass("facil");
});

test("aplica clase 'media' para dificultad Media", () => {
  render(<RecipeCard recipe={mockRecipe} onSelectRecipe={jest.fn()} />);

  const badge = screen.getByText(/dificultad:\s*media/i);
  expect(badge).toHaveClass("media");
});

test("aplica clase 'dificil' para dificultad Difícil", () => {
  render(
    <RecipeCard
      recipe={{ ...mockRecipe, difficulty: "Difícil" }}
      onSelectRecipe={jest.fn()}
    />
  );

  const badge = screen.getByText(/dificultad:\s*difícil/i);
  expect(badge).toHaveClass("dificil");
});

test("badge sin clase especial para dificultad desconocida", () => {
  render(
    <RecipeCard
      recipe={{ ...mockRecipe, difficulty: "Experto" }}
      onSelectRecipe={jest.fn()}
    />
  );

  const badge = screen.getByText(/dificultad:\s*experto/i);
  expect(badge).toHaveClass("card-badge");
  expect(badge.className).not.toContain("facil");
  expect(badge.className).not.toContain("media");
  expect(badge.className).not.toContain("dificil");
});

test("renderiza sin imagen cuando no se provee", () => {
  const { id, title, difficulty, category } = mockRecipe;
  render(
    <RecipeCard
      recipe={{ id, title, difficulty, category }}
      onSelectRecipe={jest.fn()}
    />
  );

  expect(screen.getByText("Pastel de choclo")).toBeInTheDocument();
});
