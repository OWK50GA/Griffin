"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../middleware/errorHandler");
const RouteService_1 = require("../services/RouteService");
const router = (0, express_1.Router)();
const routeService = new RouteService_1.RouteService();
// Validation middleware
const validateQuoteRequest = [
    (0, express_validator_1.body)('fromChain').isInt({ min: 1 }).withMessage('Valid fromChain required'),
    (0, express_validator_1.body)('toChain').isInt({ min: 1 }).withMessage('Valid toChain required'),
    (0, express_validator_1.body)('fromToken').isEthereumAddress().withMessage('Valid fromToken address required'),
    (0, express_validator_1.body)('toToken').isEthereumAddress().withMessage('Valid toToken address required'),
    (0, express_validator_1.body)('amount').isNumeric().withMessage('Valid amount required'),
    (0, express_validator_1.body)('slippageTolerance').optional().isFloat({ min: 0, max: 1 }).withMessage('Valid slippage tolerance (0-1) required')
];
// POST /api/v1/quotes - Get payment quotes
router.post('/', validateQuoteRequest, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new errorHandler_1.AppError('Validation failed', 400, 'VALIDATION_ERROR', { errors: errors.array() });
    }
    const quoteRequest = req.body;
    const routes = await routeService.findBestRoutes(quoteRequest);
    if (routes.length === 0) {
        throw new errorHandler_1.AppError('No viable routes found', 404, 'NO_ROUTES_AVAILABLE', {
            fromChain: quoteRequest.fromChain,
            toChain: quoteRequest.toChain,
            fromToken: quoteRequest.fromToken,
            toToken: quoteRequest.toToken
        });
    }
    const response = {
        routes,
        bestRoute: routes[0], // Routes are sorted by cost
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
    };
    res.json(response);
}));
exports.default = router;
//# sourceMappingURL=quotes.js.map