"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentService = void 0;
const uuid_1 = require("uuid");
const types_1 = require("../types");
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../utils/logger");
const ChainService_1 = require("./ChainService");
const utils_1 = require("@/utils/utils");
class IntentService {
    intents = new Map(); // intend_id => intent
    async createIntent(request) {
        try {
            // Validate intent parameters
            await this.validateIntent(request);
            const intent = {
                id: (0, uuid_1.v4)(),
                userAddress: request.userAddress,
                fromChain: request.fromChain,
                toChain: request.toChain,
                fromToken: request.fromToken,
                toToken: request.toToken,
                amount: request.amount,
                recipient: request.recipient,
                status: types_1.IntentStatus.PENDING,
                transactions: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                metadata: {}
            };
            // Store intent (in production, this would be in database)
            this.intents.set(intent.id, intent);
            logger_1.logger.info('Intent created', {
                intentId: intent.id,
                userAddress: intent.userAddress,
                fromChain: intent.fromChain,
                toChain: intent.toChain
            });
            return intent;
        }
        catch (error) {
            logger_1.logger.error('Failed to create intent', { error, request });
            throw error;
        }
    }
    async getIntent(intentId) {
        return this.intents.get(intentId) || null;
    }
    async executeIntent(intentId) {
        const intent = this.intents.get(intentId);
        if (!intent) {
            throw new errorHandler_1.AppError('Intent not found', 404, 'INTENT_NOT_FOUND');
        }
        if (intent.status !== types_1.IntentStatus.PENDING) {
            throw new errorHandler_1.AppError('Intent cannot be executed in current status', 400, 'INVALID_STATUS');
        }
        // Update status to executing
        intent.status = types_1.IntentStatus.EXECUTING;
        intent.updatedAt = new Date();
        logger_1.logger.info('Intent execution started', { intentId });
        // TODO: Implement actual execution logic
        // This would involve:
        // 1. Verify payment
        // 2. Find best route
        // 3. Execute bridge/swap
        // 4. Monitor completion
        return intent;
    }
    async cancelIntent(intentId) {
        const intent = this.intents.get(intentId);
        if (!intent) {
            throw new errorHandler_1.AppError('Intent not found', 404, 'INTENT_NOT_FOUND');
        }
        if (intent.status === types_1.IntentStatus.EXECUTING) {
            throw new errorHandler_1.AppError('Cannot cancel executing intent', 400, 'CANNOT_CANCEL');
        }
        intent.status = types_1.IntentStatus.CANCELLED;
        intent.updatedAt = new Date();
        logger_1.logger.info('Intent cancelled', { intentId });
    }
    async validateIntent(request) {
        const supportedChains = await ChainService_1.ChainService.getSupportedChains();
        const fromChain = supportedChains.find((chain) => chain.chainId === request.fromChain);
        if (!fromChain) {
            throw new errorHandler_1.AppError('Unsupported source chain', 400, 'UNSUPPORTED_CHAIN', { chainId: request.fromChain });
        }
        const toChain = supportedChains.find((chain) => chain.chainId === request.toChain);
        if (!toChain) {
            throw new errorHandler_1.AppError('Unsupported destination chain', 400, 'UNSUPPORTED_CHAIN', { chainId: request.toChain });
        }
        // Validate amount
        const amount = parseFloat(request.amount);
        if (amount <= 0) {
            throw new errorHandler_1.AppError('Amount must be greater than zero', 400, 'INVALID_AMOUNT');
        }
        const isValidSenderAddress = (0, utils_1.validateAddress)(request.fromChain, request.userAddress);
        if (!isValidSenderAddress) {
            throw new errorHandler_1.AppError('Sender address not valid on chain', 400, 'INVALID_ADDRESS');
        }
        const isValidRecipientAddress = (0, utils_1.validateAddress)(request.toChain, request.recipient);
        if (!isValidRecipientAddress) {
            throw new errorHandler_1.AppError('Sender address not valid on chain', 400, 'INVALID_ADDRESS');
        }
        const isValidInputTokenAddress = (0, utils_1.validateAddress)(request.fromChain, request.fromToken);
        if (!isValidInputTokenAddress) {
            throw new errorHandler_1.AppError('Sender address not valid on chain', 400, 'INVALID_ADDRESS');
        }
        const isValidOutputTokenAddress = (0, utils_1.validateAddress)(request.toChain, request.toToken);
        if (!isValidOutputTokenAddress) {
            throw new errorHandler_1.AppError('Sender address not valid on chain', 400, 'INVALID_ADDRESS');
        }
        // Additional validations would go here:
        // - Signature validation (if provided)
        if (!request.requestSignature) {
            throw new errorHandler_1.AppError("No signature provided", 400, 'MISSING_SIGNATURE');
        }
        const isValidSignature = (0, utils_1.validateSignature)(request.fromChain, request.requestSignature, request.requestMessage, request.userAddress);
        if (!request.requestSignature) {
            throw new errorHandler_1.AppError("Invalid signature", 400, 'MISSING_SIGNATURE');
        }
    }
}
exports.IntentService = IntentService;
//# sourceMappingURL=IntentService.js.map