import Link from "next/link";

type Props = { page: number; count: number; pageSize: number };

export function RegistrationsPagination({ page, count, pageSize }: Props) {
  const hasNext = page * pageSize < count;

  return (
    <nav aria-label="Registration pages" className="flex items-center justify-between text-sm">
      {page > 1 ? (
        <Link href={`/workspace/labs?page=${page - 1}`}>← Previous</Link>
      ) : (
        <span />
      )}
      <span>Page {page}</span>
      {hasNext ? (
        <Link href={`/workspace/labs?page=${page + 1}`}>Next →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
