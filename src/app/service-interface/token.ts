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


