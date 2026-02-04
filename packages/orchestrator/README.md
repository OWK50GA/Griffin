# Griffin Orchestrator

<!-- Written by Cairo -->

The Griffin Orchestrator is a TypeScript-based Express.js server that serves as the core backend component for cross-chain payment orchestration. It implements an intent-based architecture where users express payment intentions through client SDKs, and the orchestrator handles complex execution across multiple blockchain networks.

## Features

- **Intent Management**: Create, track, and execute cross-chain payment intents
- **Route Discovery**: Find optimal paths across DEXs and bridges with real-time quotes
- **Payment Verification**: Verify user balances and signatures before execution
- **Cross-Chain Execution**: Handle swaps and bridge transfers atomically
- **Event Monitoring**: Real-time blockchain event monitoring for payment completion
- **Risk Management**: Fraud detection and slippage protection
- **Multi-Chain Support**: Ethereum, Polygon, Arbitrum, Optimism

## Architecture

The orchestrator follows Express.js best practices with a layered architecture:

- **Route Layer**: RESTful API endpoints and middleware
- **Service Layer**: Business logic and external integrations
- **Model Layer**: Data persistence and validation
- **Middleware Layer**: Authentication, validation, error handling

## API Endpoints

```
POST   /api/v1/intents              # Create payment intent
GET    /api/v1/intents/:id          # Get intent status
PUT    /api/v1/intents/:id/execute  # Execute payment intent
POST   /api/v1/quotes               # Get route quotes
GET    /api/v1/health               # Health check
GET    /api/v1/chains               # Supported chains
```

## Quick Start

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Configure environment**:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**:

   ```bash
   pnpm dev
   ```

4. **Build for production**:
   ```bash
   pnpm build
   pnpm start
   ```

## Configuration

The orchestrator requires the following environment variables:

### Required

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- Blockchain RPC URLs for supported chains
- External API keys (1inch, Thirdweb)

### Optional

- `PORT`: Server port (default: 3000)
- `LOG_LEVEL`: Logging level (default: info)
- `CORS_ORIGINS`: Allowed CORS origins

See `.env.example` for complete configuration options.

## Development

### Scripts

```bash
pnpm dev          # Start development server with hot reload
pnpm build        # Build for production
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

### Testing

The project uses Jest for unit testing and fast-check for property-based testing:

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test IntentService.test.ts
```

### Project Structure

```
src/
├── routes/          # Express.js routes and endpoints
├── services/        # Business logic and external integrations
├── middleware/      # Express middleware (auth, validation, etc.)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions and helpers
├── config/          # Configuration management
└── app.ts           # Main application entry point
```

## External Integrations

### DEX Providers

- **1inch**: Optimal swap routing and execution
- **Uniswap**: Decentralized exchange integration

### Bridge Providers

- **Across**: Fast cross-chain transfers
- **Stargate**: Stable cross-chain liquidity
- **Orbiter**: Additional bridge routing

### Blockchain Infrastructure

- **RPC Providers**: Alchemy, Infura for blockchain connectivity
- **Event Monitoring**: WebSocket connections for real-time updates

## Error Handling

The orchestrator implements comprehensive error handling with:

- **Validation Errors** (400): Invalid parameters, unsupported chains
- **Business Logic Errors** (422): Insufficient liquidity, risk assessment failures
- **External Service Errors** (500): DEX/bridge API failures, blockchain connectivity issues

All errors include structured responses with error codes, messages, and request IDs for debugging.

## Monitoring and Health Checks

Health check endpoint (`/api/v1/health`) provides status for:

- Database connectivity
- Redis cache
- Blockchain RPC connections
- External API availability

## Security

- **Rate Limiting**: Configurable request limits per IP
- **Input Validation**: Comprehensive request validation
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers and protection
- **Signature Verification**: Cryptographic signature validation

## Contributing

1. Follow TypeScript and ESLint configurations
2. Write tests for new features
3. Update documentation for API changes
4. Use conventional commit messages

## License

MIT License - see LICENSE file for details.

<!-- Written by Cairo -->
