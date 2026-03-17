import { api } from "./api";

export async function deleteBookHttp(bookId: string) {
  await api.delete(`/books/${bookId}`);
}
