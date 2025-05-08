import { Injectable } from '@angular/core';
import { Pagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  updatePagination<T>(items: T[], currentPage: number, rowsPerPage: number, totalItems: number): Pagination {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    currentPage = Math.min(currentPage, totalPages);
    currentPage = Math.max(currentPage, 1);
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = items.slice(start, end);

    return {
      currentPage,
      rowsPerPage,
      totalPages,
      totalItems
    };
  }

  getSkipAndCount(currentPage: number, rowsPerPage: number): { skip: number; count: number } {
    return {
      skip: (currentPage - 1) * rowsPerPage,
      count: rowsPerPage
    };
  }
}