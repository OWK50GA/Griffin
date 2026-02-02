# Griffin - Cross-Chain Payment Service

Griffin is a cross-chain payment orchestration service that enables seamless payments across different blockchain networks. The service follows an **Intent-Based Model** where users express payment intent, and Griffin's orchestration layer handles the complex cross-chain execution.

## Core Value Proposition

- **Instant Cross-Chain Payments**: Users can pay with tokens from any supported chain to complete transactions on the destination chain
- **Unified Payment Experience**: Single signature for complex cross-chain operations
- **Gas Abstraction**: Service handles gas fees on destination chains
- **Liquidity Optimization**: Intelligent routing through DEXs, bridges, and liquidity providers

## Key Components

1. **Client-Side SDK**: Frontend library for dApp integration with balance scanning, quote engine, and signature collection
2. **Orchestration Layer**: Backend service handling pathfinding, transaction bundling, and gas relaying
3. **Settlement Layer**: On-chain contracts managing source vaults, swaps, bridges, and atomic completion

## Target Use Case

Enable users to pay for services (like NFT purchases) on one chain using tokens they hold on a different chain, with the payment appearing instant to the end user and dApp.