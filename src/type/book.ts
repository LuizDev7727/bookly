export type Book = {
  id: string;
  imageUrl?: string;
  title: string;
  author: string;
  status: "Lido" | "Lendo" | "Quero ler";
  stars: number;
  comment: string;
};
