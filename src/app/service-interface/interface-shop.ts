// ShowShop---------------------------------------------------------------------------

export interface ReqShowShop {
    perPage: number;
    page: number;
}


export interface ResShowShop {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: ResDataShop[];
}

export interface ResDataShop {
    id: number;
    name: string;
    status: string;
    latitude: string;
    longitude: string;
    startDate: any;
    endDate: any;
    createdAt: any;
    updatedAt: any;
    chauffeurId: any;
}

// CreateShop----------------------------------------------------------------------

export interface ReqCreateShop {
    name: string;
    status: string;
    la: string;
    long: string;
    chauffeurId: number;
}


export interface ResDataCreateShop {
    id: number;
    name: string;
    status: string;
    latitude: string;
    longitude: string;
    startDate: string;
    endDate: string;
    chauffeurId: number;
    updatedAt: string;
    createdAt: string;
}
