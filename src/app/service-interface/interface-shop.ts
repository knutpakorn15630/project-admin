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
    day_cycle: number;
    status: string;
    color: string;
    latitude: number;
    longitude: number;
    startDate: any;
    endDate: any;
    createdAt: any;
    updatedAt: any;
    chauffeurId: number;
    statusId: any;
}

// CreateShop----------------------------------------------------------------------

export interface ReqCreateShop {
    name: string;
    day_cycle: number;
    latitude: number;
    longitude: number;
}


export interface ResDataCreateShop {
    id: number;
    name: string;
    day_cycle: number;
    status: string;
    color: string;
    latitude: number;
    longitude: number;
    startDate: string;
    endDate: string;
    statusId: number;
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
    shopId: number;
    name: string;
    day_cycle: number;
    status: string;
    color: string;
    latitude: number;
    longitude: number;
    statusId: number;
}


export interface ResUpdateShop {
    id: number;
    name: string;
    day_cycle: number;
    status: string;
    color: string;
    latitude: number;
    longitude: number;
    startDate: any;
    endDate: any;
    createdAt: any;
    updatedAt: string;
    statusId: number;
}


export interface ResStatus {
    status: Status[];
}

export interface Status {
    id: number;
    typeStatus: number;
    statusName: string;
    statusColor: string;
    createdAt: any;
    updatedAt: any;
}

// -------------------------------------------Search--------------------------

export interface ReqSearchShop {
    perPage: number;
    page: number;
    name: string;
}

export interface ResSearchShop {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: DataSearchShop[];
}

export interface DataSearchShop {
    id: number;
    name: string;
    day_cycle: number;
    status: string;
    color: string;
    latitude: number;
    longitude: number;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    chauffeurId: any;
    statusId: number;
}
