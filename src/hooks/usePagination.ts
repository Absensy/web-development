import { useState, useEffect } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'

export const usePagination = (totalItems: number) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  
  // Мобилка: 1 карточка в ряду, показываем по 6
  // Планшет: 2 карточки в ряду, показываем по 8 (4 ряда)
  // Десктоп: 2 карточки в ряду, показываем по 12 (6 рядов)
  const itemsPerPage = isMobile ? 6 : (isTablet ? 8 : 12)
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleItems, setVisibleItems] = useState(itemsPerPage)
  
  // Сбрасываем пагинацию при изменении количества товаров
  useEffect(() => {
    setCurrentPage(1)
    setVisibleItems(itemsPerPage)
  }, [totalItems, itemsPerPage])
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Скролл вверх при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleShowMore = () => {
    setVisibleItems(prev => Math.min(prev + itemsPerPage, totalItems))
  }
  
  const hasMoreItems = visibleItems < totalItems
  const remainingItems = totalItems - visibleItems
  
  return {
    currentPage,
    totalPages,
    visibleItems,
    itemsPerPage,
    hasMoreItems,
    remainingItems,
    handlePageChange,
    handleShowMore,
    isMobile
  }
}
