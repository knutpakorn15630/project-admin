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


// createReport-------------------------------


export interface ReqCreateReport {
    title: string;
    material: string;
    ResponsibleName: string;
    chauffeurId: number;
    shopId: number;
}

export interface ResCreateReport {
    id: number;
    title: string;
    material: string;
    ResponsibleName: string;
    chauffeurId: number;
    shopId: number;
    updatedAt: string;
    createdAt: string;
}


export interface ResGetShop {
    data: ResDataGetShop[];
}

export interface ResDataGetShop {
    id: number;
    name: string;
    status: string;
    latitude: string;
    longitude: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    chauffeurId: any;
}


export interface ResGetChauffeur {
    data: ResGetDataChauffeur[];
}

export interface ResGetDataChauffeur {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    tel: string;
    createdAt: string;
    updatedAt: string;
}
