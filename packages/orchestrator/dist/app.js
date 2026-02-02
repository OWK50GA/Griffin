"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("./config");
const logger_1 = require("./utils/logger");
const errorHandler_1 = require("./middleware/errorHandler");
const requestLogger_1 = require("./middleware/requestLogger");
// Import routes
const intents_1 = __importDefault(require("./routes/intents"));
const quotes_1 = __importDefault(require("./routes/quotes"));
const health_1 = __importDefault(require("./routes/health"));
const chains_1 = __importDefault(require("./routes/chains"));
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: config_1.config.cors.allowedOrigins,
    credentials: true
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);
// Body parsing middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Request logging
app.use(requestLogger_1.requestLogger);
// API routes
app.use('/api/v1/intents', intents_1.default);
app.use('/api/v1/quotes', quotes_1.default);
app.use('/api/v1/health', health_1.default);
app.use('/api/v1/chains', chains_1.default);
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: {
            code: 'NOT_FOUND',
            message: 'Endpoint not found',
            timestamp: new Date().toISOString()
        }
    });
});
// Error handling middleware (must be last)
app.use(errorHandler_1.errorHandler);
const PORT = config_1.config.server.port || 3000;
app.listen(PORT, () => {
    logger_1.logger.info(`Griffin Orchestrator server running on port ${PORT}`);
    logger_1.logger.info(`Environment: ${config_1.config.env}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map