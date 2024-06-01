export interface PaginationRequestQuery {
  limit: number
  page: number
}

export interface TransactionRequestQuery extends PaginationRequestQuery {
  search: string
}
