export interface ReqReport {
    perPage: number;
    page: number;
}


export interface ResReport {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: DataReport[];
}

export interface DataReport {
    id: number;
    checkDate: string;
    shopName: string;
    ResponsibleName: string;
    status: string;
    elite: string;
    startDate: any;
    endDate: any;
    createdAt: any;
    updatedAt: any;
    chauffeurId: number;
    shopId: number;
    statusId: number;
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



// ------------------------------------------------Search----------------


export interface ReqSearchReport {
    perPage: number;
    page: number;
    shopName: string;
    checkDate: string;
    ResponsibleName: string;
}

export interface ResSearchReport {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: DataSearchReport[];
}

export interface DataSearchReport {
    id: number;
    checkDate: string;
    shopName: string;
    ResponsibleName: string;
    status: string;
    elite: string;
    startDate: any;
    endDate: any;
    createdAt: any;
    updatedAt: any;
    chauffeurId: number;
    shopId: number;
    statusId: number;
}







export interface ReqSearchDate {
    perPage: number;
    page: number;
    startDate: string;
    endDate: string;
}

export interface ResSearchDate {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: DataResSearchDate[];
}

export interface DataResSearchDate {
    id: number;
    checkDate: string;
    shopName: string;
    ResponsibleName: string;
    status: string;
    elite: string;
    startDate: any;
    endDate: any;
    createdAt: any;
    updatedAt: any;
    chauffeurId: number;
    shopId: number;
    statusId: number;
}



// sum----------------------------------------------------------------

export interface ResSum {
    sumElite: string;
}
