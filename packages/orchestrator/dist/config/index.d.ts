export declare const config: {
    env: string;
    server: {
        port: number;
        host: string;
    };
    database: {
        url: string;
    };
    redis: {
        url: string;
        ttl: number;
    };
    cors: {
        allowedOrigins: string[];
    };
    blockchain: {
        ethereum: {
            rpcUrl: string;
            chainId: number;
        };
        polygon: {
            rpcUrl: string;
            chainId: number;
        };
        arbitrum: {
            rpcUrl: string;
            chainId: number;
        };
        optimism: {
            rpcUrl: string;
            chainId: number;
        };
    };
    external: {
        oneInch: {
            apiKey: string;
            baseUrl: string;
        };
        thirdweb: {
            clientId: string;
            secretKey: string;
        };
    };
    security: {
        jwtSecret: string;
        rateLimitWindow: number;
        rateLimitMax: number;
    };
    logging: {
        level: string;
        format: string;
    };
};
//# sourceMappingURL=index.d.ts.map