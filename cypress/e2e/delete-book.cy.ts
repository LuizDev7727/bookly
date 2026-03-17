describe("Delete Book", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should open the delete confirmation dialog", () => {
    cy.get("div.rounded-xl").first().contains("button", "Excluir").click();

    cy.contains("Excluir livro").should("be.visible");
    cy.contains("Esta ação não pode ser desfeita").should("be.visible");
  });

  it("should cancel deletion and keep the book", () => {
    cy.get("div.rounded-xl")
      .first()
      .find("p.font-semibold")
      .invoke("text")
      .then((bookTitle) => {
        cy.get("div.rounded-xl").first().contains("button", "Excluir").click();

        cy.contains("button", "Cancelar").click();

        cy.contains(bookTitle).should("be.visible");
      });
  });

  it("should delete the book when confirming", () => {
    cy.get("div.rounded-xl")
      .first()
      .find("p.font-semibold")
      .invoke("text")
      .then((bookTitle) => {
        cy.get("div.rounded-xl").first().contains("button", "Excluir").click();

        cy.get("[role='dialog']").contains("button", "Excluir").click();

        cy.contains(bookTitle).should("not.exist");
      });
  });
});
