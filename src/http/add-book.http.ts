import { api } from "./api";
import type { AddBookFormType } from "@/schemas/add-book.schema";

type AddBookHttpResponse = {
  bookId: string;
};

export async function addBookHttp(book: AddBookFormType) {
  const { data } = await api.post<AddBookHttpResponse>("/books", book);
  return data;
}
