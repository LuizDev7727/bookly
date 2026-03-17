import { faker } from "@faker-js/faker";

const book = {
  title: faker.lorem.words(3),
  author: faker.person.fullName(),
  imageUrl: faker.image.url(),
  comment: faker.lorem.sentence(),
};

describe("Add Book", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should open the add book dialog", () => {
    cy.contains("button", "Adicionar Livro").click();
    cy.contains("Adicionar Livro").should("be.visible");
  });

  it("should fill and submit the form successfully", () => {
    cy.contains("button", "Adicionar Livro").click();

    cy.get('input[placeholder="Roube como um artista"]').type(book.title);
    cy.get('input[placeholder="Austin Kleon"]').type(book.author);
    cy.get('input[placeholder*="media-amazon"]').type(book.imageUrl);

    cy.get("button").filter(":has(svg.lucide-star)").eq(3).click();

    cy.get("[data-testid='status-select']").click();
    cy.contains("[role='option']", "Lido").click();

    cy.get("textarea").type(book.comment);

    cy.get("[data-testid='submit-add-book']").click();

    cy.contains(book.title).should("be.visible");
  });

  it("should show validation error for invalid image URL", () => {
    cy.contains("button", "Adicionar Livro").click();

    cy.get('input[placeholder="Roube como um artista"]').type(book.title);
    cy.get('input[placeholder="Austin Kleon"]').type(book.author);
    cy.get('input[placeholder*="media-amazon"]').type("url-invalida");

    cy.get("[data-testid='status-select']").click();
    cy.contains("[role='option']", "Lendo").click();

    cy.get("[data-testid='submit-add-book']").click();

    cy.contains("URL Inválida").should("be.visible");
  });

  it("should show validation error when status is not selected", () => {
    cy.contains("button", "Adicionar Livro").click();

    cy.get('input[placeholder="Roube como um artista"]').type(book.title);
    cy.get('input[placeholder="Austin Kleon"]').type(book.author);

    cy.get("[data-testid='submit-add-book']").click();

    cy.contains("Status Inválido").should("be.visible");
  });

  it("should submit with zero stars when no rating is selected", () => {
    cy.contains("button", "Adicionar Livro").click();

    cy.get('input[placeholder="Roube como um artista"]').type(book.title);
    cy.get('input[placeholder="Austin Kleon"]').type(book.author);
    cy.get('input[placeholder*="media-amazon"]').type(book.imageUrl);

    cy.get("[data-testid='status-select']").click();
    cy.contains("[role='option']", "Quero Ler").click();

    cy.get("[data-testid='submit-add-book']").click();

    cy.contains(book.title).should("be.visible");
  });

  it("should clear stars when X button is clicked", () => {
    cy.contains("button", "Adicionar Livro").click();

    cy.get("button").filter(":has(svg.lucide-star)").eq(2).click();
    cy.get("[data-testid='clear-stars']").click();

    cy.get("form")
      .find("svg.lucide-star")
      .each(($star) => {
        cy.wrap($star).should("have.attr", "fill", "transparent");
      });
  });
});
