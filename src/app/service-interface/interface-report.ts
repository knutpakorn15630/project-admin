export interface ReqReport {
    perPage: number;
    page: number;
}

export interface ResReport {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: any[];
}
