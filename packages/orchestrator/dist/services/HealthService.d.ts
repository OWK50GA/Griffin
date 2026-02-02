interface HealthStatus {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    version: string;
    dependencies: {
        database: DependencyStatus;
        redis: DependencyStatus;
        blockchain: {
            ethereum: DependencyStatus;
            polygon: DependencyStatus;
            arbitrum: DependencyStatus;
            optimism: DependencyStatus;
        };
        external: {
            oneInch: DependencyStatus;
        };
    };
}
interface DependencyStatus {
    status: 'healthy' | 'degraded' | 'unhealthy';
    responseTime?: number;
    error?: string;
}
export declare class HealthService {
    getHealthStatus(): Promise<HealthStatus>;
    private checkDatabase;
    private checkRedis;
    private checkBlockchainConnections;
    private checkBlockchainRPC;
    private checkExternalServices;
    private checkOneInchAPI;
    private determineOverallStatus;
}
export {};
//# sourceMappingURL=HealthService.d.ts.map