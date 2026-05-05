describe("Base de datos de recetas", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // ── Flujo 1: Visualización de recetas ──
  it("muestra la lista de recetas al cargar la aplicación", () => {
    cy.get("h1").should("contain", "Base de datos de recetas");

    cy.contains("Recetas disponibles").should("be.visible");

    cy.contains("Pastel de choclo").should("be.visible");
    cy.contains("Ensalada chilena").should("be.visible");
    cy.contains("Leche asada").should("be.visible");
    cy.contains("Charquicán").should("be.visible");

    cy.contains("No hay recetas guardadas.").should("be.visible");
  });

  // ── Flujo 2: Filtrado por categoría ──
  it("permite filtrar recetas por categoría", () => {
    cy.contains("Pastel de choclo").should("be.visible");

    cy.get("select").select("Postres");

    cy.contains("Leche asada").should("be.visible");
    cy.contains("Pastel de choclo").should("not.exist");
    cy.contains("Ensalada chilena").should("not.exist");

    cy.get("select").select("Ensaladas");

    cy.contains("Ensalada chilena").should("be.visible");
    cy.contains("Leche asada").should("not.exist");

    cy.get("select").select("Todas");

    cy.contains("Pastel de choclo").should("be.visible");
    cy.contains("Ensalada chilena").should("be.visible");
    cy.contains("Leche asada").should("be.visible");
  });

  // ── Flujo 3: Ver detalle de una receta ──
  it("permite ver el detalle completo de una receta", () => {
    cy.contains("article", "Pastel de choclo")
      .find("button")
      .click();

    cy.contains("Tiempo de cocción: 60 minutos").should("be.visible");
    cy.contains("Ingredientes").should("be.visible");
    cy.contains("Choclo").should("be.visible");
    cy.contains("Preparación").should("be.visible");
    cy.contains("Guardar receta").should("be.visible");

    cy.contains("article", "Ensalada chilena")
      .find("button")
      .click();

    cy.get(".detail").contains("Ensalada chilena").should("be.visible");
    cy.contains("Tiempo de cocción: 15 minutos").should("be.visible");
    cy.get(".detail").contains("Pastel de choclo").should("not.exist");
  });

  // ── Flujo 4: Guardar receta y prevenir duplicados ──
  it("permite guardar una receta y evita duplicados", () => {
    cy.contains("article", "Ensalada chilena")
      .find("button")
      .click();

    cy.contains("Ensalada chilena").should("be.visible");

    cy.contains("Guardar receta").click();

    cy.get(".saved").contains("Ensalada chilena").should("be.visible");
    cy.get(".saved").contains("No hay recetas guardadas.").should("not.exist");

    cy.contains("Guardar receta").click();

    cy.get(".saved ul li").should("have.length", 1);

    cy.contains("article", "Pastel de choclo")
      .find("button")
      .click();

    cy.contains("Pastel de choclo").should("be.visible");
    cy.contains("Guardar receta").click();

    cy.get(".saved ul li").should("have.length", 2);
    cy.get(".saved").contains("Ensalada chilena").should("be.visible");
    cy.get(".saved").contains("Pastel de choclo").should("be.visible");
  });
});
