"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteService = void 0;
const uuid_1 = require("uuid");
const logger_1 = require("../utils/logger");
class RouteService {
    async findBestRoutes(request) {
        try {
            logger_1.logger.info('Finding routes', { request });
            const routes = [];
            // Check if same chain (DEX swap only)
            if (request.fromChain === request.toChain) {
                const swapRoute = await this.findSwapRoute(request);
                if (swapRoute) {
                    routes.push(swapRoute);
                }
            }
            else {
                // Cross-chain routes (bridge + optional swaps)
                const bridgeRoutes = await this.findBridgeRoutes(request);
                routes.push(...bridgeRoutes);
            }
            // Sort routes by total cost (ascending)
            routes.sort((a, b) => parseFloat(a.totalCost) - parseFloat(b.totalCost));
            logger_1.logger.info('Routes found', { count: routes.length, request });
            return routes;
        }
        catch (error) {
            logger_1.logger.error('Failed to find routes', { error, request });
            throw error;
        }
    }
    async findSwapRoute(request) {
        // Mock DEX swap route
        const gasEstimate = {
            gasLimit: '150000',
            gasPrice: '20000000000', // 20 gwei
            totalCost: '0.003' // ETH
        };
        const fees = {
            gasFee: '0.003',
            protocolFee: '0.001',
            total: '0.004'
        };
        const step = {
            type: 'swap',
            provider: '1inch',
            fromChain: request.fromChain,
            toChain: request.toChain,
            fromToken: request.fromToken,
            toToken: request.toToken,
            amount: request.amount,
            estimatedOutput: (parseFloat(request.amount) * 0.997).toString(), // 0.3% slippage
            fees
        };
        return {
            id: (0, uuid_1.v4)(),
            steps: [step],
            totalCost: fees.total,
            estimatedTime: 30, // seconds
            slippageTolerance: request.slippageTolerance || 0.005,
            gasEstimate,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
        };
    }
    async findBridgeRoutes(request) {
        const routes = [];
        // Mock bridge routes for different providers
        const providers = ['across', 'stargate', 'orbiter'];
        for (const provider of providers) {
            const route = await this.createBridgeRoute(request, provider);
            if (route) {
                routes.push(route);
            }
        }
        return routes;
    }
    async createBridgeRoute(request, provider) {
        const gasEstimate = {
            gasLimit: '300000',
            gasPrice: '25000000000', // 25 gwei
            totalCost: '0.0075' // ETH
        };
        const bridgeFees = {
            bridgeFee: '0.01',
            gasFee: '0.0075',
            protocolFee: '0.002',
            total: '0.0195'
        };
        const steps = [];
        // If tokens are different, add swap on source chain
        if (request.fromToken !== request.toToken) {
            steps.push({
                type: 'swap',
                provider: '1inch',
                fromChain: request.fromChain,
                toChain: request.fromChain,
                fromToken: request.fromToken,
                toToken: request.toToken, // Swap to bridge-compatible token
                amount: request.amount,
                estimatedOutput: (parseFloat(request.amount) * 0.997).toString(),
                fees: {
                    gasFee: '0.003',
                    protocolFee: '0.001',
                    total: '0.004'
                }
            });
        }
        // Add bridge step
        steps.push({
            type: 'bridge',
            provider,
            fromChain: request.fromChain,
            toChain: request.toChain,
            fromToken: request.toToken,
            toToken: request.toToken,
            amount: steps.length > 0 ? steps[0].estimatedOutput : request.amount,
            estimatedOutput: (parseFloat(request.amount) * 0.99).toString(), // 1% bridge fee
            fees: bridgeFees
        });
        return {
            id: (0, uuid_1.v4)(),
            steps,
            totalCost: bridgeFees.total,
            estimatedTime: provider === 'across' ? 120 : 300, // seconds
            slippageTolerance: request.slippageTolerance || 0.01,
            gasEstimate,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        };
    }
}
exports.RouteService = RouteService;
//# sourceMappingURL=RouteService.js.map