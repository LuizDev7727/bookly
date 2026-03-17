describe("Get Books", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should display the book list", () => {
    cy.get("div.rounded-xl").should("have.length.greaterThan", 0);
  });

  it("should display up to 12 books on the first page", () => {
    cy.get("div.rounded-xl").should("have.length.lte", 12);
  });

  it("should display book info on each card", () => {
    cy.get("div.rounded-xl").first().within(() => {
      cy.get("p.font-semibold").should("not.be.empty");
      cy.get("p.text-muted-foreground").first().should("not.be.empty");
      cy.get("button").contains("Editar").should("be.visible");
      cy.get("button").contains("Excluir").should("be.visible");
    });
  });

  it("should load more books when scrolling to the bottom", () => {
    cy.get("div.rounded-xl").its("length").then((initialCount) => {
      cy.window().scrollTo("bottom");

      cy.get("div.rounded-xl").should("have.length.greaterThan", initialCount);
    });
  });
});
