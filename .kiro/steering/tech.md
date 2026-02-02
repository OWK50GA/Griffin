# Griffin - Technical Stack & Build System

## Build System & Package Management

- **Package Manager**: pnpm (v10.24.0)
- **Workspace Structure**: Monorepo with packages in `packages/*` and `website`
- **Build Tool**: tsup for TypeScript compilation
- **Language**: TypeScript (v5.9.0)

## Common Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests across all packages
pnpm test

# Lint all packages
pnpm lint
```

## Technology Stack by Component

### Frontend SDK
- **Wallet Integration**: Wagmi, Viem, Starknet.js
- **Web3 Libraries**: For multi-chain wallet connections and address mapping

### Backend Services
- **Runtime**: Node.js or Go for relayer nodes
- **High-Performance Computing**: Python/Rust for solver logic and pathfinding
- **Transaction Relaying**: Defender Relayer or custom implementation

### External Integrations
- **Pricing APIs**: 1inch API, CoinGecko for real-time exchange rates
- **Liquidity Providers**: LI.FI, 1inch, Uniswap for optimal routing
- **Bridge Protocols**: Across, Stargate, Orbiter for cross-chain transfers
- **Authentication**: Thirdweb (CLIENT_ID and SECRET_KEY required)

## Development Environment

### Required Environment Variables
```bash
THIRDWEB_CLIENT_ID=your_client_id
THIRDWEB_SECRET_KEY=your_secret_key
```

### Architecture Patterns
- **Intent-Based Architecture**: Users sign intents, service executes complex operations
- **Atomic Operations**: Ensure payment completion or full rollback
- **Liquidity Provider Model**: Service acts as intermediary for instant settlements