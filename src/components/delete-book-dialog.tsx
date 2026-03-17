import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { deleteBookHttp } from "@/http/delete-book.http";
import type { Book } from "@/type/book";

type BooksQueryData = InfiniteData<{ books: Book[]; nextCursor: string | undefined }>;

type DeleteBookDialogProps = {
  bookId: string;
  bookName: string;
};

export function DeleteBookDialog({ bookId, bookName }: DeleteBookDialogProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteBook } = useMutation({
    mutationFn: () => deleteBookHttp(bookId),
    onSuccess: () => {
      queryClient.setQueryData<BooksQueryData>(["books"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            books: page.books.filter((b) => b.id !== bookId),
          })),
        };
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="destructive" size="sm" className="flex-1" />
        }
      >
        <Trash2Icon />
        Excluir
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Excluir livro</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir <strong className="text-foreground">"{bookName}"</strong>?
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter showCloseButton={false}>
          <DialogClose render={<Button variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button variant="destructive" onClick={() => deleteBook()}>Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
