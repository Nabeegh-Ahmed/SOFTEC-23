import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";
import { CookieOptions } from "express";
import { IPayload, IPayloadExtension } from "../types/context.type";
import AppError from "./error.util";
import { APP_MESSAGES } from "../languages";


export type tokenPrivateKey = "accessTokenPrivateKey" | "refreshTokenPrivateKey";
export type toeknPublicKey = "accessTokenPublicKey" | "refreshTokenPublicKey";
export type tokenExpireInKey = "accessTokenExpiresIn" | "refreshTokenExpiresIn";

const isProduction = process.env.NODE_ENV === 'production'

// Sign JWT Token
const signJwt = (
  payload: Object,
  key: tokenPrivateKey,
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(config.get<string>(key), "base64").toString(
    "ascii"
  );
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};


// Sign Jwt Access Token
export const signJwtAccessToken = async (payload: Object) => {
  return signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
  });
}

// Sign Jwt Refresh Token
export const signJwtRefreshToken = async (payload: Object) => {
  return signJwt(payload, "refreshTokenPrivateKey", {
    expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
  });
}


export const signJwtTokens = async (payload: Object) => {
  const accessToken = await signJwtAccessToken(payload);
  const refreshToken = await signJwtRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
  };
};


// Verify JWT Token
export const verifyJwt = <T>(
  token: string,
  key: toeknPublicKey
): T | null => {
  try {
    const publicKey = Buffer.from(config.get<string>(key), "base64").toString(
      "ascii"
    );
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};


export const verifyOrGenerateAccessTokenIfExpired = async (
  refreshToken?: string,
  accessToken?: string,
) => {

  let payload: IPayloadExtension | null = null;
  if (accessToken) {
    payload = verifyJwt<IPayloadExtension>(accessToken, 'accessTokenPublicKey');
  }

  // Check if expired 
  if (!accessToken || payload?.exp! < Date.now() / 1000) {

    // Check if the refresh token is present
    if (!refreshToken) {
      throw new AppError(APP_MESSAGES.ACCOUNT.REQUIRED_TOKEN, 401);
    }

    // Verify the refresh token
    const refreshTokenPayload = verifyJwt<IPayloadExtension>(refreshToken, 'refreshTokenPublicKey');
    if (!refreshTokenPayload) {
      throw new AppError(APP_MESSAGES.ACCOUNT.INVALID_EXPIRED_TOKEN, 401);
    }

    // Check if expired
    if (refreshTokenPayload.exp! < Date.now() / 1000) {
      throw new AppError(APP_MESSAGES.ACCOUNT.INVALID_EXPIRED_TOKEN, 401);
    }

    // Check if the user id is the same
    if (refreshTokenPayload.accountId !== payload?.accountId) {
      throw new AppError(APP_MESSAGES.ACCOUNT.UNAUTHORIZED, 401);
    }

    payload = refreshTokenPayload;

    // Generate a new access token
    const newAccessToken = await signJwtAccessToken(payload);

    return {
      accessToken: newAccessToken,
      payload
    };
  }

  return { accessToken: null, payload };
}



// jwt cookie options
export const getJwtCookieOptions = (
  key: tokenExpireInKey,
): CookieOptions => {
  return {
    expires: new Date(
      Date.now() + config.get<number>(key) * 60 * 1000
    ),
    maxAge: config.get<number>(key) * 60 * 1000,
    httpOnly: isProduction,
    sameSite: isProduction ? "none" : "lax",
    secure: true,
  };
};


