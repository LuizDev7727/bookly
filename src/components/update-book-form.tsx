import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { StarIcon, XIcon } from "lucide-react";
import type { Book } from "@/type/book";
import {
  updateBookSchema,
  type UpdateBookFormType,
} from "@/schemas/update-book.schema";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { updateBookHttp } from "@/http/update-book.http";

type BooksQueryData = InfiniteData<{
  books: Book[];
  nextCursor: string | undefined;
}>;

type UpdateBookFormProps = {
  book: Book;
};

export function UpdateBookForm({ book }: UpdateBookFormProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: updateBook } = useMutation({
    mutationFn: (formData: UpdateBookFormType) =>
      updateBookHttp({
        ...formData,
        id: book.id,
        imageUrl: formData.imageUrl ?? "",
      }),
    onSuccess: (_, variables) => {
      const updatedBook: Book = {
        ...variables,
        id: book.id,
        imageUrl: variables.imageUrl ?? "",
      };

      queryClient.setQueryData<BooksQueryData>(["books"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            books: page.books.map((b) => (b.id === book.id ? updatedBook : b)),
          })),
        };
      });
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateBookFormType>({
    resolver: zodResolver(updateBookSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      imageUrl: book.imageUrl,
      status: book.status,
      stars: book.stars,
      comment: book.comment,
    },
  });

  async function handleUpdateBook(formBody: UpdateBookFormType) {
    await updateBook(formBody);
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateBook)}
      className="w-full space-y-4"
    >
      <div className="space-y-2">
        <Label>Título</Label>
        <Input placeholder="Roube como um artista" {...register("title")} />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Author</Label>
        <Input placeholder="Austin Kleon" {...register("author")} />
        {errors.author && (
          <p className="text-sm text-destructive">{errors.author.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>URL da imagem</Label>
        <Input
          placeholder="https://m.media-amazon.com/images/I/51lI9is-gnL._SY342_.jpg"
          {...register("imageUrl")}
        />
        {errors.imageUrl && (
          <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lido">Lido</SelectItem>
                <SelectItem value="Lendo">Lendo</SelectItem>
                <SelectItem value="Quero Ler">Quero Ler</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <p className="text-sm text-destructive">{errors.status.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Avaliação</Label>
        <Controller
          name="stars"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="cursor-pointer"
                  onClick={() => field.onChange(star)}
                >
                  <StarIcon
                    className="size-4"
                    fill={
                      star <= (field.value ?? 0)
                        ? "oklch(79.5% 0.184 86.047)"
                        : "transparent"
                    }
                    stroke={
                      star <= (field.value ?? 0)
                        ? "oklch(79.5% 0.184 86.047)"
                        : "currentColor"
                    }
                  />
                </button>
              ))}
              {field.value > 0 && (
                <button
                  type="button"
                  className="cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={() => field.onChange(0)}
                >
                  <XIcon className="size-4" />
                </button>
              )}
            </div>
          )}
        />
        {errors.stars && (
          <p className="text-sm text-destructive">{errors.stars.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Comentário</Label>
        <Textarea
          placeholder="Maravilhoso, abre a mente! Difícil parar de ler."
          className="resize-none"
          {...register("comment")}
        />
        {errors.comment && (
          <p className="text-sm text-destructive">{errors.comment.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full">
        Salvar alterações
      </Button>
    </form>
  );
}
