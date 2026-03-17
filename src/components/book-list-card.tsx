import { StarIcon, ImageOffIcon } from "lucide-react";
import { DeleteBookDialog } from "./delete-book-dialog";
import { UpdateBookDialog } from "./update-book-dialog";

type BookListCardProps = {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
  status: "Lido" | "Lendo" | "Quero Ler";
  stars: number;
  comment: string;
};

const statusStyles = {
  Lido: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Lendo: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Quero Ler": "bg-muted text-muted-foreground",
};

export function BookListCard({
  id,
  title,
  author,
  imageUrl,
  status,
  stars,
  comment,
}: BookListCardProps) {
  return (
    <div className="flex w-52 flex-col gap-3 rounded-xl border border-border bg-background p-3 shadow-sm">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="h-64 w-full rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-64 w-full items-center justify-center rounded-lg bg-muted">
          <ImageOffIcon className="size-10 text-muted-foreground" />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold leading-tight">{title}</p>
        <p className="text-xs text-muted-foreground">{author}</p>
      </div>

      <span
        className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
      >
        {status}
      </span>

      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className="size-4"
            fill={star <= stars ? "oklch(79.5% 0.184 86.047)" : "transparent"}
            stroke={
              star <= stars ? "oklch(79.5% 0.184 86.047)" : "currentColor"
            }
          />
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{comment}</p>

      <div className="flex gap-2">
        <UpdateBookDialog
          book={{ id, title, author, imageUrl, status, stars, comment }}
        />
        <DeleteBookDialog bookId={id} bookName={title} />
      </div>
    </div>
  );
}
