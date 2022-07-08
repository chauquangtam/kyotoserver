import { createClient, RedisClientType } from 'redis';

export default class Redis {
    port: number;
    host: string;
    username: string;
    password: string;
    client: RedisClientType;

    private static instance: Redis;

    private constructor(
        port: number,
        host: string,
        username: string,
        password: string,
    ) {
        this.port = port;
        this.host = host;
        this.username = username;
        this.password = password;

        this.client = createClient({
            url: `redis://default:BLXWaLsLb5jpB1Q01SzXubKJ3B9cDLds@redis-19749.c257.us-east-1-3.ec2.cloud.redislabs.com:19749`,
        });

        this.connect();

        this.client.on('error', (err) =>
            console.log('Redis Client Error >>>>', err),
        );
    }

    private async connect() {
        try {
            this.client.connect();
        } catch (err) {
            console.log('Connect Error >>>> ', err);
        }
    }

    public static Instance(
        port: number,
        host: string,
        username: string,
        password: string,
    ) {
        if (!this.instance) {
            this.instance = new this(port, host, username, password);
        }

        return this.instance;
    }

    public getRedisClient() {
        return this.client;
    }
}