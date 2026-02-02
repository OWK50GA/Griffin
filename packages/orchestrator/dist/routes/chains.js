"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../middleware/errorHandler");
const ChainService_1 = require("../services/ChainService");
const router = (0, express_1.Router)();
const chainService = new ChainService_1.ChainService();
// GET /api/v1/chains - Get supported chains
router.get('/', (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const chains = await chainService.getSupportedChains();
    res.json({ chains });
}));
// GET /api/v1/chains/:chainId/tokens - Get supported tokens for a chain
router.get('/:chainId/tokens', (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const chainId = parseInt(req.params.chainId, 10);
    const tokens = await chainService.getSupportedTokens(chainId);
    res.json({ tokens });
}));
exports.default = router;
//# sourceMappingURL=chains.js.map