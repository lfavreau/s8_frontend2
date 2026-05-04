import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryFilter from "../components/CategoryFilter.jsx";

const categories = ["Platos principales", "Ensaladas", "Postres"];

test("renderiza la opción 'Todas' por defecto", () => {
  render(
    <CategoryFilter
      categories={categories}
      selectedCategory="Todas"
      onChangeCategory={jest.fn()}
    />
  );

  expect(screen.getByRole("combobox")).toHaveValue("Todas");
});

test("renderiza todas las categorías como opciones", () => {
  render(
    <CategoryFilter
      categories={categories}
      selectedCategory="Todas"
      onChangeCategory={jest.fn()}
    />
  );

  expect(screen.getByRole("option", { name: "Platos principales" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Ensaladas" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Postres" })).toBeInTheDocument();
});

test("llama a onChangeCategory con el valor seleccionado", async () => {
  const onChangeCategory = jest.fn();
  const user = userEvent.setup();

  render(
    <CategoryFilter
      categories={categories}
      selectedCategory="Todas"
      onChangeCategory={onChangeCategory}
    />
  );

  await user.selectOptions(screen.getByRole("combobox"), "Postres");

  expect(onChangeCategory).toHaveBeenCalledWith("Postres");
});

test("refleja la categoría seleccionada en el select", () => {
  render(
    <CategoryFilter
      categories={categories}
      selectedCategory="Ensaladas"
      onChangeCategory={jest.fn()}
    />
  );

  expect(screen.getByRole("combobox")).toHaveValue("Ensaladas");
});

test("renderiza correctamente sin categorías", () => {
  render(
    <CategoryFilter
      categories={[]}
      selectedCategory="Todas"
      onChangeCategory={jest.fn()}
    />
  );

  expect(screen.getByRole("combobox")).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Todas" })).toBeInTheDocument();
});
