import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const MAX_BUTTONS = 5;

  const getPageNumbers = () => {
    if (totalPages <= MAX_BUTTONS) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: number[] = [];
    const halfVisible = Math.floor(MAX_BUTTONS / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + MAX_BUTTONS - 1);

    if (endPage - startPage < MAX_BUTTONS - 1) {
      startPage = Math.max(1, endPage - MAX_BUTTONS + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`${styles.pageButton} ${styles.navButton}`}
        aria-label="Página anterior"
      >
        ←
      </button>

      {pageNumbers.map((pageNum) => {
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`${styles.pageButton} ${isActive ? styles.pageButtonActive : ""}`}
            aria-label={`Página ${pageNum}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`${styles.pageButton} ${styles.navButton}`}
        aria-label="Página siguiente"
      >
        →
      </button>
    </div>
  );
}
