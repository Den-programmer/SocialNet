export const parsePagination = (query, defaultPageSize, maxPageSize) => {
  const rawPage = Number.parseInt(query.page, 10)
  const rawPageSize = Number.parseInt(query.pageSize, 10)

  return {
    page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1,
    pageSize: Number.isInteger(rawPageSize)
      ? Math.min(Math.max(rawPageSize, 1), maxPageSize)
      : defaultPageSize
  }
}

export const paginationMeta = (page, pageSize, totalCount) => ({
  page,
  pageSize,
  totalCount,
  totalPages: Math.ceil(totalCount / pageSize),
  hasNextPage: page * pageSize < totalCount,
  hasPreviousPage: page > 1
})
