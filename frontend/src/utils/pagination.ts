type PageItem = number | "..."

export function getPaginationButtons(
  currentPage: number,
  totalPages: number,
  maxButtons = 7,
) {
  if (totalPages <= maxButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: PageItem[] = []

  const firstPage = 1
  const lastPage = totalPages

  const siblingCount = 1 // quantos vizinhos ao redor da página atual
  const leftSibling = Math.max(currentPage - siblingCount, 2)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1)

  pages.push(firstPage)

  if (leftSibling > 2) {
    pages.push("...")
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i)
  }

  if (rightSibling < totalPages - 1) {
    pages.push("...")
  }

  pages.push(lastPage)

  return pages
}