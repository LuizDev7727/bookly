import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { PencilIcon } from "lucide-react";
import type { Book } from "@/type/book";
import { UpdateBookForm } from "./update-book-form";

type UpdateBookDialogProps = {
  book: Book;
};

export function UpdateBookDialog({ book }: UpdateBookDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="flex-1" />
        }
      >
        <PencilIcon />
        Editar
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar livro</DialogTitle>
        </DialogHeader>
        <UpdateBookForm book={book} />
      </DialogContent>
    </Dialog>
  );
}
