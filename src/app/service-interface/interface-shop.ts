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

// GetChauffeur--------------------------------------------------------------------------------

export interface ResDataChauffeur {
    data: DesChauffeur[];
}

export interface DesChauffeur {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    tel: string;
    createdAt: string;
    updatedAt: string;
}


// updateShop-------------------------------------------------------------------------------------

export interface ReqUpdateShop {
    id: number;
    name: string;
    status: string;
    la: string;
    long: string;
}


export interface ResUpdateShop{
    id: number;
    name: string;
    status: string;
    latitude: string;
    longitude: string;
    startDate: string;
    endDate: string;
    createdAt: any;
    updatedAt: string;
    chauffeurId: any;
}
