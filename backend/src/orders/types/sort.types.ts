import { ALLOWED_SORT_FIELDS } from '../constants/order.constants';

export type SortBy = (typeof ALLOWED_SORT_FIELDS)[number];
export type SortDir = 'asc' | 'desc';
