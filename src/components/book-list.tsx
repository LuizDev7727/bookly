import { BookListEmpty } from "./book-list-empty";
import { BookListCard } from "./book-list-card";
import { useEffect, useRef } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getBooksHttp } from "@/http/get-books.http";

export function BookList() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["books"],
      queryFn: async ({ pageParam }) => {
        const { books, nextCursor } = await getBooksHttp({
          cursor: pageParam,
        });

        return { books, nextCursor };
      },
      getNextPageParam: (lastPage) => {
        return lastPage?.nextCursor ?? undefined;
      },
      initialPageParam: undefined as string | undefined,
    });

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const books = data.pages.flatMap((page) => page.books);

  const isBooksEmpty = books.length === 0;

  if (isBooksEmpty) {
    return <BookListEmpty />;
  }

  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-4">
        {books.map((book) => (
          <BookListCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            imageUrl={book.imageUrl}
            status={book.status}
            stars={book.stars}
            comment={book.comment}
          />
        ))}
      </div>
      <div ref={loadMoreRef} className="h-1" />
    </div>
  );
}
