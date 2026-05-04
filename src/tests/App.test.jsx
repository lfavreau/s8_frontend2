import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";

test("renderiza el título principal", async () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Base de datos de recetas" })).toBeInTheDocument();
});

test("renderiza el subtítulo", async () => {
  render(<App />);

  expect(screen.getByText(/explora, filtra y guarda/i)).toBeInTheDocument();
});

test("muestra recetas guardadas vacío al inicio", () => {
  render(<App />);

  expect(screen.getByText("No hay recetas guardadas.")).toBeInTheDocument();
});

test("permite seleccionar y guardar una receta sin duplicarla", async () => {
  const user = userEvent.setup();

  render(<App />);

  await screen.findByText("Pastel de choclo");
  await user.click(screen.getAllByText("Ver detalle")[0]);

  expect(await screen.findByText("Tiempo de cocción: 60 minutos")).toBeInTheDocument();

  await user.click(screen.getByText("Guardar receta"));
  await user.click(screen.getByText("Guardar receta"));

  const savedSection = screen.getByRole("heading", { name: /recetas guardadas/i }).closest("section");

  expect(within(savedSection).getAllByText("Pastel de choclo")).toHaveLength(1);
});

test("muestra el detalle de selección vacío inicialmente", async () => {
  render(<App />);

  expect(screen.getByText("Selecciona una receta para ver su detalle.")).toBeInTheDocument();
});

test("actualiza el detalle al seleccionar otra receta", async () => {
  const user = userEvent.setup();

  render(<App />);

  await screen.findByText("Pastel de choclo");

  const listPanel = screen.getByText("Recetas disponibles").closest("section");
  const { getAllByText: getAllByTextInList } = within(listPanel);

  await user.click(getAllByTextInList("Ver detalle")[0]);
  expect(await screen.findByText("Tiempo de cocción: 60 minutos")).toBeInTheDocument();

  await user.click(getAllByTextInList("Ver detalle")[1]);
  expect(await screen.findByText("Tiempo de cocción: 15 minutos")).toBeInTheDocument();
  expect(screen.queryByText("Tiempo de cocción: 60 minutos")).not.toBeInTheDocument();
});

test("puede guardar múltiples recetas distintas", async () => {
  const user = userEvent.setup();

  render(<App />);

  await screen.findByText("Pastel de choclo");

  const listPanel = screen.getByText("Recetas disponibles").closest("section");
  const { getAllByText: getAllByTextInList } = within(listPanel);

  await user.click(getAllByTextInList("Ver detalle")[0]);
  await screen.findByText("Tiempo de cocción: 60 minutos");
  await user.click(screen.getByText("Guardar receta"));

  await user.click(getAllByTextInList("Ver detalle")[1]);
  await screen.findByText("Tiempo de cocción: 15 minutos");
  await user.click(screen.getByText("Guardar receta"));

  const savedSection = screen.getByRole("heading", { name: /recetas guardadas/i }).closest("section");
  expect(within(savedSection).getByText("Pastel de choclo")).toBeInTheDocument();
  expect(within(savedSection).getByText("Ensalada chilena")).toBeInTheDocument();
});
