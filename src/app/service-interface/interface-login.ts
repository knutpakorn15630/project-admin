export interface ReqLogins {
    userName: string;
    password: string;
}


export interface ResLogins {
    accessToken: string;
    refreshToken: string;
    google_mapKey: string;
    data: DataLogin;
}

export interface DataLogin {
    id: number;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
}

export interface ResLogin2 {
    accessToken: string;
    refreshToken: string;
}

