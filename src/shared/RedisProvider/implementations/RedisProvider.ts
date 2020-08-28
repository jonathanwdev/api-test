import Redis, { Redis as RedisType } from 'ioredis';
import RedisConfig from '../../../config/redis';
import IRedisProvider from '../models/IRedisProvider';

export default class RedisProvider implements IRedisProvider {
  private client: RedisType;

  constructor() {
    this.client = new Redis(RedisConfig.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value), 'EX', 60 * 10);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
