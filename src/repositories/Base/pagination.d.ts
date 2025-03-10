export type PaginationRequestOptions = {
  pageSize: number;
  currentPage: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
  filterBy: { [key: string]: any };
  [key: string]: any;
};

export type PaginationResponse = {
  page_size: number;
  current_page: number;
  total: number;
  [key: string]: any;
};

export type PaginationDto = {
  page: number;
  page_size: number;
  [key: string]: any;
};
