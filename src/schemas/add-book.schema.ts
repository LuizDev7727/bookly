import { z } from "zod";

export const addBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  imageUrl: z.url({ error: "URL Inválida" }).optional(),
  status: z.enum(["Lido", "Lendo", "Quero ler"], { error: "Status Inválido" }),
  stars: z.number(),
  comment: z.string(),
});

export type AddBookFormType = z.infer<typeof addBookSchema>;
