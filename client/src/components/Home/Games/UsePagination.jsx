import { useState } from 'react'

const usePagination = (array, pageSize) => {
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(array.length / pageSize)

  const getPageItems = (page) => {
    const startIndex = page * pageSize
    const endIndex = startIndex + pageSize
    const pageItems = array.slice(startIndex, endIndex)
    return pageItems
  }

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page)
    }
  }

  return {
    currentPage,
    totalPages,
    getPageItems,
    nextPage,
    previousPage,
    goToPage
  }
}

export default usePagination
