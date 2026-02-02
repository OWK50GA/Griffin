"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../middleware/errorHandler");
const HealthService_1 = require("../services/HealthService");
const router = (0, express_1.Router)();
const healthService = new HealthService_1.HealthService();
// GET /api/v1/health - Health check endpoint
router.get('/', (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const healthStatus = await healthService.getHealthStatus();
    const statusCode = healthStatus.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(healthStatus);
}));
exports.default = router;
//# sourceMappingURL=health.js.map