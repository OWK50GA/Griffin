import { HealthStatus } from '@/types';
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
//# sourceMappingURL=HealthService.d.ts.map