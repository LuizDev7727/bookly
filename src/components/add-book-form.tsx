import { addBookSchema, type AddBookFormType } from "@/schemas/add-book.schema";
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
import { Loader2, StarIcon, XIcon } from "lucide-react";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { addBookHttp } from "@/http/add-book.http";
import type { Book } from "@/type/book";

type BooksQueryData = InfiniteData<{
  books: Book[];
  nextCursor: string | undefined;
}>;

export function AddBookForm() {
  const queryClient = useQueryClient();

  const { mutateAsync: addBook } = useMutation({
    mutationFn: addBookHttp,
    onSuccess: (data, variables) => {
      const newBook: Book = {
        ...variables,
        id: data.bookId,
        imageUrl: variables.imageUrl ?? "",
      };

      queryClient.setQueryData<BooksQueryData>(["books"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page, index) =>
            index === 0 ? { ...page, books: [newBook, ...page.books] } : page,
          ),
        };
      });
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      stars: 0,
      comment: "",
    },
  });

  async function handleAddBook(formBody: AddBookFormType) {
    const newBook = formBody;

    console.log({ newBook });

    await addBook(newBook);
  }

  return (
    <form onSubmit={handleSubmit(handleAddBook)} className="w-full space-y-4">
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
              <SelectTrigger className="w-full" data-testid="status-select">
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
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  data-testid="clear-stars"
                  onClick={() => field.onChange(0)}
                >
                  <XIcon className="size-4" />
                </Button>
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
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
        data-testid="submit-add-book"
      >
        {isSubmitting && <Loader2 className="size-4" />}
        Adicionar
      </Button>
    </form>
  );
}
