import { z } from "zod";

export const updateBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  imageUrl: z.url({ error: "URL Inválida" }).optional(),
  status: z.enum(["Lido", "Lendo", "Quero Ler"], { error: "Status Inválido" }),
  stars: z.number(),
  comment: z.string(),
});

export type UpdateBookFormType = z.infer<typeof updateBookSchema>;
