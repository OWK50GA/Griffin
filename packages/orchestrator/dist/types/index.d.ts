import { Signature, TypedData } from "starknet";
export interface Intent {
    id: string;
    userAddress: string;
    fromChain: string;
    toChain: string;
    fromToken: string;
    toToken: string;
    amount: string;
    recipient: string;
    status: IntentStatus;
    route?: RouteInfo;
    transactions: TransactionInfo[];
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date;
    metadata: Record<string, any>;
}
export declare enum IntentStatus {
    PENDING = "pending",
    VERIFIED = "verified",
    EXECUTING = "executing",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
export interface RouteInfo {
    id: string;
    steps: RouteStep[];
    totalCost: string;
    estimatedTime: number;
    slippageTolerance: number;
    gasEstimate: GasEstimate;
    createdAt: Date;
    expiresAt: Date;
}
export interface RouteStep {
    type: 'swap' | 'bridge';
    provider: string;
    fromChain: number;
    toChain: number;
    fromToken: string;
    toToken: string;
    amount: string;
    estimatedOutput: string;
    fees: FeeInfo;
}
export interface TransactionInfo {
    id: string;
    intentId: string;
    chainId: number;
    hash?: string;
    status: TransactionStatus;
    type: 'swap' | 'bridge' | 'approval';
    gasUsed?: string;
    gasPrice?: string;
    blockNumber?: number;
    confirmations: number;
    createdAt: Date;
    submittedAt?: Date;
    confirmedAt?: Date;
    failureReason?: string;
}
export declare enum TransactionStatus {
    PENDING = "pending",
    SUBMITTED = "submitted",
    CONFIRMED = "confirmed",
    FAILED = "failed"
}
export interface GasEstimate {
    gasLimit: string;
    gasPrice: string;
    maxFeePerGas?: string;
    maxPriorityFeePerGas?: string;
    totalCost: string;
}
export interface FeeInfo {
    bridgeFee?: string;
    gasFee: string;
    protocolFee?: string;
    slippageFee?: string;
    total: string;
}
export type SignatureType = Signature | any;
export type IntentMessageType = TypedData | any;
export interface CreateIntentRequest {
    fromChain: string;
    toChain: string;
    fromToken: string;
    toToken: string;
    amount: string;
    recipient: string;
    userAddress: string;
    requestSignature?: SignatureType;
    requestMessage: IntentMessageType;
}
export interface IntentResponse {
    intentId: string;
    status: IntentStatus;
    createdAt: string;
    estimatedCompletion?: string;
    route?: RouteInfo;
    transactions?: TransactionInfo[];
}
export interface QuoteRequest {
    fromChain: number;
    toChain: number;
    fromToken: string;
    toToken: string;
    amount: string;
    slippageTolerance?: number;
}
export interface QuoteResponse {
    routes: RouteInfo[];
    bestRoute?: RouteInfo;
    timestamp: string;
    expiresAt: string;
}
export interface ErrorResponse {
    error: {
        code: string;
        message: string;
        details?: Record<string, any>;
        timestamp: string;
        requestId?: string;
    };
}
export type ChainInfo = {
    chainId: string;
    name: string;
    symbol: string;
    rpcUrl: string;
    blockExplorer: string;
    isTestnet: boolean;
};
export interface TokenInfo {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    chainId: ChainInfo['chainId'];
    logoUrl?: string;
}
export interface HealthStatus {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    version: string;
    dependencies: {
        database: DependencyStatus;
        redis: DependencyStatus;
        blockchain: {
            starknet: DependencyStatus;
        };
        external: {
            oneInch: DependencyStatus;
        };
    };
}
export interface DependencyStatus {
    status: 'healthy' | 'degraded' | 'unhealthy';
    responseTime?: number;
    error?: string;
}
//# sourceMappingURL=index.d.ts.map