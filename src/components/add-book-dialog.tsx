import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { AddBookForm } from "./add-book-form";

export function AddBookDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Plus />
          Adicionar Livro
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Livro</DialogTitle>
          <DialogDescription>Testandoo</DialogDescription>
        </DialogHeader>
        <AddBookForm />
      </DialogContent>
    </Dialog>
  );
}
