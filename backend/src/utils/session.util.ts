import redisClient from "../config/db/redis.db";
import { IPayload } from "../types/context.type";
import { signJwtTokens } from "./jwt.util";
import config from 'config';


export const createSession = async (payload: IPayload) => {
    const { accessToken, refreshToken } = await signJwtTokens(payload)
    const session = await redisClient.set(payload?.accountId, JSON.stringify(payload), {
        EX: config.get<number>("refreshTokenExpiresIn") * 60,
    });

    return {
        accessToken,
        refreshToken,
        session,
    };
}
