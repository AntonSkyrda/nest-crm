export const ALLOWED_SORT_FIELDS = [
  'id',
  'name',
  'surname',
  'email',
  'phone',
  'age',
  'course',
  'course_format',
  'course_type',
  'status',
  'sum',
  'alreadyPaid',
  'created_at',
] as const;

type SortBy = (typeof ALLOWED_SORT_FIELDS)[number];
type SortDir = 'asc' | 'desc';
