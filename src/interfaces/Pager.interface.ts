export interface PagerProps {
  items: Array<{}>;
  totalItems: number;
  initialPage: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
  onChangePage: (page: number, sortField: string,
    sortDirection: string ) => void;
}
