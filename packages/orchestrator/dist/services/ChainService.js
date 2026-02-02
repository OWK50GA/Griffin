"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainService = void 0;
const errorHandler_1 = require("../middleware/errorHandler");
class ChainService {
    supportedChains = [
        {
            chainId: 1,
            name: 'Ethereum',
            symbol: 'ETH',
            rpcUrl: process.env.ETHEREUM_RPC_URL || '',
            blockExplorer: 'https://etherscan.io',
            isTestnet: false,
            supportedTokens: ['0xA0b86a33E6441c8C06DD2b7c94b7E0e8c07e8e8e'] // Mock USDC
        },
        {
            chainId: 137,
            name: 'Polygon',
            symbol: 'MATIC',
            rpcUrl: process.env.POLYGON_RPC_URL || '',
            blockExplorer: 'https://polygonscan.com',
            isTestnet: false,
            supportedTokens: ['0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'] // Mock USDC
        },
        {
            chainId: 42161,
            name: 'Arbitrum One',
            symbol: 'ETH',
            rpcUrl: process.env.ARBITRUM_RPC_URL || '',
            blockExplorer: 'https://arbiscan.io',
            isTestnet: false,
            supportedTokens: ['0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'] // Mock USDC
        },
        {
            chainId: 10,
            name: 'Optimism',
            symbol: 'ETH',
            rpcUrl: process.env.OPTIMISM_RPC_URL || '',
            blockExplorer: 'https://optimistic.etherscan.io',
            isTestnet: false,
            supportedTokens: ['0x7F5c764cBc14f9669B88837ca1490cCa17c31607'] // Mock USDC
        }
    ];
    supportedTokens = [
        {
            address: '0xA0b86a33E6441c8C06DD2b7c94b7E0e8c07e8e8e',
            symbol: 'USDC',
            name: 'USD Coin',
            decimals: 6,
            chainId: 1,
            logoUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png'
        },
        {
            address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
            symbol: 'USDC',
            name: 'USD Coin',
            decimals: 6,
            chainId: 137,
            logoUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png'
        },
        {
            address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
            symbol: 'USDC',
            name: 'USD Coin',
            decimals: 6,
            chainId: 42161,
            logoUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png'
        },
        {
            address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
            symbol: 'USDC',
            name: 'USD Coin',
            decimals: 6,
            chainId: 10,
            logoUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png'
        }
    ];
    async getSupportedChains() {
        return this.supportedChains;
    }
    async getSupportedTokens(chainId) {
        if (chainId) {
            const tokens = this.supportedTokens.filter(token => token.chainId === chainId);
            if (tokens.length === 0) {
                throw new errorHandler_1.AppError('No tokens found for chain', 404, 'NO_TOKENS_FOUND', { chainId });
            }
            return tokens;
        }
        return this.supportedTokens;
    }
    async getChainInfo(chainId) {
        return this.supportedChains.find(chain => chain.chainId === chainId) || null;
    }
    async isChainSupported(chainId) {
        return this.supportedChains.some(chain => chain.chainId === chainId);
    }
    async isTokenSupported(tokenAddress, chainId) {
        return this.supportedTokens.some(token => token.address.toLowerCase() === tokenAddress.toLowerCase() && token.chainId === chainId);
    }
    async getTokenInfo(tokenAddress, chainId) {
        return this.supportedTokens.find(token => token.address.toLowerCase() === tokenAddress.toLowerCase() && token.chainId === chainId) || null;
    }
}
exports.ChainService = ChainService;
//# sourceMappingURL=ChainService.js.map