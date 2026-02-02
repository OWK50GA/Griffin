"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
class HealthService {
    async getHealthStatus() {
        const startTime = Date.now();
        try {
            const [databaseStatus, redisStatus, blockchainStatus, externalStatus] = await Promise.all([
                this.checkDatabase(),
                this.checkRedis(),
                this.checkBlockchainConnections(),
                this.checkExternalServices()
            ]);
            const overallStatus = this.determineOverallStatus([
                databaseStatus,
                redisStatus,
                ...Object.values(blockchainStatus),
                ...Object.values(externalStatus)
            ]);
            const healthStatus = {
                status: overallStatus,
                timestamp: new Date().toISOString(),
                version: process.env.npm_package_version || '0.1.0',
                dependencies: {
                    database: databaseStatus,
                    redis: redisStatus,
                    blockchain: blockchainStatus,
                    external: externalStatus
                }
            };
            const duration = Date.now() - startTime;
            logger_1.logger.info('Health check completed', { status: overallStatus, duration });
            return healthStatus;
        }
        catch (error) {
            logger_1.logger.error('Health check failed', { error });
            return {
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                version: process.env.npm_package_version || '0.1.0',
                dependencies: {
                    database: { status: 'unhealthy', error: 'Health check failed' },
                    redis: { status: 'unhealthy', error: 'Health check failed' },
                    blockchain: {
                        ethereum: { status: 'unhealthy', error: 'Health check failed' },
                        polygon: { status: 'unhealthy', error: 'Health check failed' },
                        arbitrum: { status: 'unhealthy', error: 'Health check failed' },
                        optimism: { status: 'unhealthy', error: 'Health check failed' }
                    },
                    external: {
                        oneInch: { status: 'unhealthy', error: 'Health check failed' }
                    }
                }
            };
        }
    }
    async checkDatabase() {
        const startTime = Date.now();
        try {
            // TODO: Implement actual database connection check
            // For now, return healthy if DATABASE_URL is configured
            if (!config_1.config.database.url) {
                return { status: 'unhealthy', error: 'Database URL not configured' };
            }
            const responseTime = Date.now() - startTime;
            return { status: 'healthy', responseTime };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                error: error instanceof Error ? error.message : 'Database connection failed'
            };
        }
    }
    async checkRedis() {
        const startTime = Date.now();
        try {
            // TODO: Implement actual Redis connection check
            if (!config_1.config.redis.url) {
                return { status: 'unhealthy', error: 'Redis URL not configured' };
            }
            const responseTime = Date.now() - startTime;
            return { status: 'healthy', responseTime };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                error: error instanceof Error ? error.message : 'Redis connection failed'
            };
        }
    }
    async checkBlockchainConnections() {
        const checks = await Promise.allSettled([
            this.checkBlockchainRPC('ethereum', config_1.config.blockchain.ethereum.rpcUrl),
            this.checkBlockchainRPC('polygon', config_1.config.blockchain.polygon.rpcUrl),
            this.checkBlockchainRPC('arbitrum', config_1.config.blockchain.arbitrum.rpcUrl),
            this.checkBlockchainRPC('optimism', config_1.config.blockchain.optimism.rpcUrl)
        ]);
        return {
            ethereum: checks[0].status === 'fulfilled' ? checks[0].value : { status: 'unhealthy', error: 'Connection failed' },
            polygon: checks[1].status === 'fulfilled' ? checks[1].value : { status: 'unhealthy', error: 'Connection failed' },
            arbitrum: checks[2].status === 'fulfilled' ? checks[2].value : { status: 'unhealthy', error: 'Connection failed' },
            optimism: checks[3].status === 'fulfilled' ? checks[3].value : { status: 'unhealthy', error: 'Connection failed' }
        };
    }
    async checkBlockchainRPC(name, rpcUrl) {
        const startTime = Date.now();
        try {
            if (!rpcUrl) {
                return { status: 'degraded', error: `${name} RPC URL not configured` };
            }
            // TODO: Implement actual RPC health check
            // For now, just check if URL is provided
            const responseTime = Date.now() - startTime;
            return { status: 'healthy', responseTime };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                error: error instanceof Error ? error.message : `${name} RPC connection failed`
            };
        }
    }
    async checkExternalServices() {
        const oneInchStatus = await this.checkOneInchAPI();
        return {
            oneInch: oneInchStatus
        };
    }
    async checkOneInchAPI() {
        const startTime = Date.now();
        try {
            if (!config_1.config.external.oneInch.apiKey) {
                return { status: 'degraded', error: '1inch API key not configured' };
            }
            // TODO: Implement actual 1inch API health check
            const responseTime = Date.now() - startTime;
            return { status: 'healthy', responseTime };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                error: error instanceof Error ? error.message : '1inch API connection failed'
            };
        }
    }
    determineOverallStatus(statuses) {
        const unhealthyCount = statuses.filter(s => s.status === 'unhealthy').length;
        const degradedCount = statuses.filter(s => s.status === 'degraded').length;
        if (unhealthyCount > 0) {
            return 'unhealthy';
        }
        else if (degradedCount > 0) {
            return 'degraded';
        }
        else {
            return 'healthy';
        }
    }
}
exports.HealthService = HealthService;
//# sourceMappingURL=HealthService.js.map