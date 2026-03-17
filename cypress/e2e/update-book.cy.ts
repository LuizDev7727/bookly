import { faker } from "@faker-js/faker";

const updatedBook = {
  title: faker.lorem.words(3),
  author: faker.person.fullName(),
  comment: faker.lorem.sentence(),
};

describe("Update Book", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should open the edit dialog", () => {
    cy.get("div.rounded-xl").first().contains("button", "Editar").click();

    cy.contains("Editar livro").should("be.visible");
  });

  it("should have the form pre-filled with the book data", () => {
    cy.get("div.rounded-xl")
      .first()
      .find("p.font-semibold")
      .invoke("text")
      .then((bookTitle) => {
        cy.get("div.rounded-xl").first().contains("button", "Editar").click();

        cy.get('[placeholder="Roube como um artista"]').should(
          "have.value",
          bookTitle
        );
      });
  });

  it("should update the book title successfully", () => {
    cy.get("div.rounded-xl").first().contains("button", "Editar").click();

    cy.get('[placeholder="Roube como um artista"]')
      .clear()
      .type(updatedBook.title);

    cy.contains("button", "Salvar alterações").click();

    cy.contains(updatedBook.title).should("be.visible");
  });

  it("should show validation error for invalid image URL", () => {
    cy.get("div.rounded-xl").first().contains("button", "Editar").click();

    cy.get('[placeholder*="media-amazon"]').clear().type("url-invalida");

    cy.contains("button", "Salvar alterações").click();

    cy.contains("URL Inválida").should("be.visible");
  });
});
