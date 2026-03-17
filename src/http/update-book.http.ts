import type { Book } from "@/type/book";
import { api } from "./api";

export async function updateBookHttp(book: Book) {
  await api.put(`/books/${book.id}`, book);
}
