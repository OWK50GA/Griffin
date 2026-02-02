import { ChainInfo, TokenInfo } from '../types';
export declare class ChainService {
    private supportedChains;
    private supportedTokens;
    getSupportedChains(): Promise<ChainInfo[]>;
    getSupportedTokens(chainId?: number): Promise<TokenInfo[]>;
    getChainInfo(chainId: number): Promise<ChainInfo | null>;
    isChainSupported(chainId: number): Promise<boolean>;
    isTokenSupported(tokenAddress: string, chainId: number): Promise<boolean>;
    getTokenInfo(tokenAddress: string, chainId: number): Promise<TokenInfo | null>;
}
//# sourceMappingURL=ChainService.d.ts.map