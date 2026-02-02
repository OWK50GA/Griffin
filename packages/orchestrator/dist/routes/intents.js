"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../middleware/errorHandler");
const IntentService_1 = require("../services/IntentService");
const router = (0, express_1.Router)();
const intentService = new IntentService_1.IntentService();
// Validation middleware
const validateCreateIntent = [
    (0, express_validator_1.body)('fromChain').isInt({ min: 1 }).withMessage('Valid fromChain required'),
    (0, express_validator_1.body)('toChain').isInt({ min: 1 }).withMessage('Valid toChain required'),
    (0, express_validator_1.body)('fromToken').isEthereumAddress().withMessage('Valid fromToken address required'),
    (0, express_validator_1.body)('toToken').isEthereumAddress().withMessage('Valid toToken address required'),
    (0, express_validator_1.body)('amount').isNumeric().withMessage('Valid amount required'),
    (0, express_validator_1.body)('recipient').isEthereumAddress().withMessage('Valid recipient address required'),
    (0, express_validator_1.body)('userAddress').isEthereumAddress().withMessage('Valid userAddress required'),
    (0, express_validator_1.body)('signature').optional().isString().withMessage('Valid signature required')
];
const validateIntentId = [
    (0, express_validator_1.param)('id').isUUID().withMessage('Valid intent ID required')
];
// POST /api/v1/intents - Create new payment intent
router.post('/', validateCreateIntent, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new errorHandler_1.AppError('Validation failed', 400, 'VALIDATION_ERROR', { errors: errors.array() });
    }
    const intentRequest = req.body;
    const intent = await intentService.createIntent(intentRequest);
    const response = {
        intentId: intent.id,
        status: intent.status,
        createdAt: intent.createdAt.toISOString(),
        route: intent.route,
        transactions: intent.transactions
    };
    res.status(201).json(response);
}));
// GET /api/v1/intents/:id - Get intent status
router.get('/:id', validateIntentId, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new errorHandler_1.AppError('Validation failed', 400, 'VALIDATION_ERROR', { errors: errors.array() });
    }
    const intentId = req.params.id;
    const intent = await intentService.getIntent(intentId);
    if (!intent) {
        throw new errorHandler_1.AppError('Intent not found', 404, 'INTENT_NOT_FOUND');
    }
    const response = {
        intentId: intent.id,
        status: intent.status,
        createdAt: intent.createdAt.toISOString(),
        estimatedCompletion: intent.completedAt?.toISOString(),
        route: intent.route,
        transactions: intent.transactions
    };
    res.json(response);
}));
// PUT /api/v1/intents/:id/execute - Execute payment intent
router.put('/:id/execute', validateIntentId, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new errorHandler_1.AppError('Validation failed', 400, 'VALIDATION_ERROR', { errors: errors.array() });
    }
    const intentId = req.params.id;
    const intent = await intentService.executeIntent(intentId);
    const response = {
        intentId: intent.id,
        status: intent.status,
        createdAt: intent.createdAt.toISOString(),
        route: intent.route,
        transactions: intent.transactions
    };
    res.json(response);
}));
// DELETE /api/v1/intents/:id - Cancel payment intent
router.delete('/:id', validateIntentId, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new errorHandler_1.AppError('Validation failed', 400, 'VALIDATION_ERROR', { errors: errors.array() });
    }
    const intentId = req.params.id;
    await intentService.cancelIntent(intentId);
    res.status(204).send();
}));
exports.default = router;
//# sourceMappingURL=intents.js.map