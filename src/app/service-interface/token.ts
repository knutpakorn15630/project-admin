export interface ResTokenService {
    accessToken: string;
    refreshToken: string;
}



// -------------------------------------------RefreshToken-------------------------------------------

export interface ReqRefreshToken {
    token: string;
}

export interface ResRefreshToken {
    accessToken: string;
}

// -------------------------------------------token key-------------------------------------------

export interface ResKeyToken {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}



