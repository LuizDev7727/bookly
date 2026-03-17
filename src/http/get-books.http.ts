import type { Book } from "@/type/book";
import { api } from "./api";

type GetBooksHttpParams = {
  author?: string;
  status?: string;
  cursor?: string;
};

type GetBooksHttpResponse = {
  books: Book[];
  nextCursor: string | null;
};

export async function getBooksHttp(params: GetBooksHttpParams) {
  const { data } = await api.get<GetBooksHttpResponse>("/books", {
    params: {
      author: params.author,
      status: params.status,
      cursor: params.cursor,
    },
  });
  return data;
}
