import { ChainInfo, TokenInfo } from '../types';
export declare class ChainService {
    private static supportedChains;
    private supportedTokens;
    static getSupportedChains(): Promise<ChainInfo[]>;
    getSupportedTokens(chainId?: string): Promise<TokenInfo[]>;
    static getChainInfo(chainId: string): Promise<ChainInfo | null>;
    static isChainSupported(chainId: string): Promise<boolean>;
    isTokenSupported(tokenAddress: string, chainId: string): Promise<boolean>;
    getTokenInfo(tokenAddress: string, chainId: string): Promise<TokenInfo | null>;
}
//# sourceMappingURL=ChainService.d.ts.map