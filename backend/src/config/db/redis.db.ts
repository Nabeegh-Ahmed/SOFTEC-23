import { createClient } from 'redis';
import config from 'config';
import Logger from "../../utils/logger.util";

const redisUrl = config.get<string>('redisDbUrl');
const redisClient = createClient({
    url: redisUrl,
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        Logger.log('Redis client connected...');
    } catch (err: any) {
        Logger.error(err.message);
        setTimeout(connectRedis, 5000);
    }
};

connectRedis();

redisClient.on('connect', () =>
    Logger.log('🚀 Redis client connected successfully')
);

redisClient.on('error', (err) => {
    Logger.error('🚀 Redis client connection failed');
    Logger.error(err.message);
});

export default redisClient;
