
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
    token: string;
    id: number;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
    passwordNew: string;
}


// Logout --------------------------


export interface ReqLogoutUser {
    token: string;
}
