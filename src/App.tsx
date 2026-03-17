import { Notebook } from "lucide-react";
import { BookList } from "./components/book-list";
import { AddBookDialog } from "./components/add-book-dialog";
import { Separator } from "./components/ui/separator";
import { BookFilters } from "./components/book-filters";

export default function App() {
  return (
    <div className="space-y-4 p-4 mx-auto max-w-360">
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Notebook />
            Minha Biblioteca
          </div>
          <AddBookDialog />
        </div>
        <Separator />
      </header>
      <BookFilters />

      <BookList />
    </div>
  );
}
