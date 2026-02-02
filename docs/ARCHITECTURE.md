<!-- Written by Cairo -->
# Griffin Architecture

## Orchestrator

The Griffin Orchestrator is the core backend service built as an Express.js TypeScript server that handles cross-chain payment orchestration. It implements an intent-based architecture where users express payment intentions through client SDKs, and the orchestrator manages complex execution across multiple blockchain networks.

### Core Functions

#### Intent Management
- **createIntent()** - Process SDK calls and create payment intents with validation
- **validateIntent()** - Validate intent parameters, chains, addresses, and amounts  
- **getIntentStatus()** - Track and return intent execution status and details
- **cancelIntent()** - Handle intent cancellation and cleanup

#### Route Discovery  
- **findBestRoute()** - Compare DEX/bridge options and calculate optimal execution paths
- **getQuotes()** - Fetch real-time quotes from multiple DEXs (1inch, Uniswap) and bridges (Across, Stargate, Orbiter)
- **calculateFees()** - Compute total costs including gas fees, bridge fees, and slippage
- **getSupportedPairs()** - Return available token pairs and supported blockchain networks

#### Payment Verification (Pre-Execution)
- **verifyBalance()** - Confirm user has sufficient tokens including gas and bridge fees
- **validateSignature()** - Verify cryptographic signatures match intent parameters and sender
- **assessRisk()** - Evaluate intents for suspicious patterns and compliance
- **updateIntentStatus()** - Update intent status based on verification results

#### Cross-Chain Execution
- **executeBridge()** - Handle cross-chain transfers via bridge protocols
- **executeSwap()** - Handle same-chain DEX swaps with slippage protection
- **executeIntent()** - Orchestrate complete payment flow following optimal routes
- **handleFailure()** - Implement rollback procedures and error recovery

#### Event Monitoring & Completion
- **startListeners()** - Initialize blockchain event listeners across supported networks
- **monitorTransactions()** - Track transaction confirmations and status updates
- **verifyCompletion()** - Confirm payment completion on destination chains
- **handleTimeout()** - Manage payment timeouts and trigger investigation procedures

### Service Architecture

#### Core Services

**IntentService**
- Intent lifecycle management and state transitions
- Business rule validation and coordination with other services
- Intent persistence and status tracking

**RouteService** 
- Quote aggregation from multiple DEXs and bridges
- Route optimization and cost calculation algorithms
- Route caching and performance optimization

**VerificationService**
- Balance verification and signature validation
- Risk assessment and fraud detection
- Pre-execution security gates

**ExecutionService**
- Cross-chain payment orchestration and atomic operations
- Transaction sequencing and dependency management
- Rollback procedures and error handling

**EventService**
- Blockchain event monitoring and WebSocket management
- Transaction confirmation tracking
- Payment completion verification

**LiquidityService**
- Liquidity tracking across chains and tokens
- Automated rebalancing and threshold management
- External liquidity provider integration

**RiskService**
- Suspicious pattern detection and address blacklisting
- Slippage threshold enforcement
- Dynamic route management based on protocol health

**ChainService**
- Multi-chain configuration and connection management
- Gas estimation and fee calculation per network
- Chain-specific feature support (EIP-1559, etc.)

#### External Integrations

**DEX Providers**
- 1inch API integration for optimal swap routing
- Uniswap integration for decentralized exchanges
- Quote aggregation and execution coordination

**Bridge Providers**  
- Across protocol for fast cross-chain transfers
- Stargate for stable cross-chain liquidity
- Orbiter for additional bridge routing options

**Blockchain Infrastructure**
- RPC provider management (Alchemy, Infura)
- WebSocket connections for real-time event monitoring
- Transaction submission and confirmation tracking

### Express.js Architecture Pattern

The orchestrator follows Express.js best practices with:

**Route Layer** (`/routes`)
- RESTful endpoint definitions and HTTP method handling
- Request parameter extraction and initial validation
- Response formatting and status code management

**Service Layer** (`/services`) 
- Business logic implementation and external API coordination
- Cross-chain operation orchestration
- Data transformation and validation

**Model Layer** (`/models`)
- Database schema definitions and ORM integration
- Data persistence and query operations
- Validation rules and constraints

**Middleware Layer** (`/middleware`)
- Authentication and authorization
- Request validation and sanitization  
- Error handling and logging
- Rate limiting and CORS configuration

### API Endpoints

```
POST   /api/v1/intents              # Create payment intent
GET    /api/v1/intents/:id          # Get intent status  
PUT    /api/v1/intents/:id/execute  # Execute payment intent
POST   /api/v1/quotes               # Get route quotes
GET    /api/v1/routes/:id           # Get route details
GET    /api/v1/health               # Health check
GET    /api/v1/chains               # Supported chains
GET    /api/v1/tokens               # Supported tokens
```

### Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with middleware stack
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis for quote caching and session management
- **Monitoring**: Winston logging and Prometheus metrics
- **Testing**: Jest with fast-check for property-based testing

<!-- Written by Cairo -->