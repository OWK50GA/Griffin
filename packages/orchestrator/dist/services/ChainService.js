"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainService = void 0;
const errorHandler_1 = require("../middleware/errorHandler");
class ChainService {
    /*
      STARKNET ONLY FOR FIRST ITERATION
    */
    static supportedChains = [
        {
            chainId: "starknet:sepolia",
            name: 'Starknet',
            symbol: 'Starknet',
            rpcUrl: "",
            blockExplorer: "",
            isTestnet: true,
        }
    ];
    supportedTokens = [
        // {
        //   address: '0xA0b86a33E6441c8C06DD2b7c94b7E0e8c07e8e8e',
        //   symbol: 'USDC',
        //   name: 'USD Coin',
        //   decimals: 6,
        //   chainId: 1,
        //   logoUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png'
        // },
        // {
        //   address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        //   symbol: 'USDC',
        //   name: 'USD Coin',
        //   decimals: 6,
        //   chainId: 137,
        //   logoUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png'
        // },
        // {
        //   address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
        //   symbol: 'USDC',
        //   name: 'USD Coin',
        //   decimals: 6,
        //   chainId: 42161,
        //   logoUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png'
        // },
        {
            address: '0x0512feac6339ff7889822cb5aa2a86c848e9d392bb0e3e237c008674feed8343',
            symbol: 'USDC',
            name: 'Circle USD',
            decimals: 6,
            chainId: 'starknet:sepolia',
            logoUrl: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png'
        },
        {
            address: '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D',
            symbol: 'STRK',
            name: 'Starknet Token',
            decimals: 18,
            chainId: 'starknet:sepolia'
        }
    ];
    static async getSupportedChains() {
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
    static async getChainInfo(chainId) {
        return this.supportedChains.find(chain => chain.chainId === chainId) || null;
    }
    static async isChainSupported(chainId) {
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