import { RedisOptions } from 'ioredis';

interface IRedisOptions {
  redis: RedisOptions;
}

export default {
  redis: {
    host: 'localhost',
    port: 6379,
    password: undefined,
  },
} as IRedisOptions;
