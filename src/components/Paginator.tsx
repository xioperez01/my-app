interface PaginatorProps<T> {
  currentPage: number;
  next: () => void;
  prev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  label?: string;
}

function Paginator<T>({
  currentPage,
  next,
  prev,
  hasNext,
  hasPrev,
  label,
}: PaginatorProps<T>) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {label && <p>{label}</p>}
      <button disabled={!hasPrev} onClick={prev}>
        Prev
      </button>
      <span>{currentPage}</span>
      <button disabled={!hasNext} onClick={next}>
        Next
      </button>
    </div>
  );
}

export default Paginator;
