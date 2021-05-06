
// showUser---------------------------------------

export interface ResShowUser {
    data: Daum[];
}

export interface Daum {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}


// CreateUser------------------------------------



export interface ReqCreateUser {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}

export interface ResCreateUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    updatedAt: string;
    createdAt: string;
}


// DeleteUser---------------------


export interface ReqDeleteUser {
    id: number;
}


// UpdateUser-------------------------


export interface ReqUpdateUser {
    id: string;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
}

export interface ResUpdateUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}


// Logout --------------------------


export interface ReqLogoutUser {
    refreshToken: string;
}


// GetData ผ่านทาง Token

export interface ResTokenData {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

