export interface ReqDelivery {
    perPage: number;
    page: number;
}

export interface ResDataDelivery {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: ResData[];
}

export interface ResData {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    tel: string;
    createdAt: string;
    updatedAt: string;
}


// createDelivery--------------------------------


export interface ReqCreateDelivery {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    tel: string;
}

export interface ResCreateDelivery {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    tel: string;
    updatedAt: string;
    createdAt: string;
}


// -------------------------update-----------------------------

export interface ReqUpdate {
    id: string;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
    tel: string;
}

export interface ResUpdate {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    tel: string;
    createdAt: string;
    updatedAt: string;
}


