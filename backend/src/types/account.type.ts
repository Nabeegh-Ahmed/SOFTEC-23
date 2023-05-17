export interface ISessionTokens {
    access_token: string;
    refresh_token: string;
}

export interface GoogleOauthToken extends ISessionTokens {
    id_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
}

export interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    picture: string;
    name: string;
}


export interface GetGoogleUserInput {
    id_token: string;
    access_token: string;
}

export interface IAccountMiddlewareFlags {
    checkSession?: boolean;
    requireAccessToken?: boolean;
    requireRefreshToken?: boolean;
    emailVerifyStatus?: boolean;
    phoneVerifyStatus?: boolean;
    identityVerifyStatus?: boolean;
    authorizedById?: boolean;
}

