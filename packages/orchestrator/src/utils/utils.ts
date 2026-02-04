import { config } from "@/config";
import { IntentMessageType, SignatureType, QuoteRequest } from "@/types";
import { executeSwap, fetchTokens, getQuotes, Quote, Token } from "@avnu/avnu-sdk";
import { parseUnits } from "ethers";
import {
    Account,
  AccountInterface,
  RpcProvider,
  Signature,
  TypedData,
  validateAndParseAddress,
} from "starknet";

const validateStarknetAddress = (address: string): boolean => {
  const isValid = !!validateAndParseAddress(address);
  return isValid;
};

export const validateAddress = (chainId: string, address: string): boolean => {
  if (chainId.startsWith("starknet")) {
    return validateStarknetAddress(address);
  }

  // EVMs would be: if chainId.startsWith(eip155);

  return false;
};

// TODO: Implement Signature Validation for Starknet
const validateStarknetSignature = async (
  signature: Signature,
  message: TypedData,
  userAddress: string | `0x${string}`,
): Promise<boolean> => {
  const provider = new RpcProvider({
    nodeUrl: config.blockchain.starknet.rpcUrl,
  });

  const verifyResponse = await provider.verifyMessageInStarknet(
    message,
    signature,
    userAddress,
  );

  return verifyResponse;
};

export const validateSignature = async (
  chainId: string,
  signature: SignatureType,
  message: IntentMessageType,
  userAddress: string | `0x${string}`,
): Promise<boolean> => {
  if (chainId.startsWith("starknet")) {
    return await validateStarknetSignature(
      signature as Signature,
      message as TypedData,
      userAddress,
    );
  }

  return false;
};

export const getStarknetTokens = async (): Promise<Token[]> => {
    const tokens = await fetchTokens({
        tags: ['Verified', 'AVNU'],
        page: 0,
        size: 200
    });

    return tokens.content;
}

const getStarknetTokensQuotes = async (request: QuoteRequest): Promise<Quote[]> => {
    const quotes = await getQuotes({
        sellTokenAddress: request.fromToken,
        buyTokenAddress: request.toToken,
        sellAmount: parseUnits(`${request.amount}`),
    })

    return quotes;
}

export const getTokenQuotes = async (request: QuoteRequest) => {
    if (request.fromChain.startsWith('starknet')) {
        return getStarknetTokensQuotes(request);
    }

    return [];
}

export function calculateAvnuEstimatedOutput(quote: Quote, routePercent: number): string {
  // Calculate this route's portion of the total buy amount
  if (routePercent === 100) {
    return quote.buyAmount.toString();
  }
  // For split routes, calculate proportional output
  const proportion = Number(routePercent) / 100;
  const output = quote.buyAmount * BigInt(Math.floor(proportion * 10000)) / 10000n;
  return output.toString();
}

export function calculateAvnuTotalCost(quote: Quote, routePercent: number): string {
  // Total cost = fees + gas + price impact
  const fees = quote.fee.avnuFees + quote.fee.integratorFees;
  const gas = quote.gasFees;
  
  // Adjust for route percentage if split
  if (routePercent === 100) {
    return (fees + gas).toString();
  }
  
  const proportion = Number(routePercent) / 100;
  const adjustedFees = fees * BigInt(Math.floor(proportion * 10000)) / 10000n;
  const adjustedGas = gas * BigInt(Math.floor(proportion * 10000)) / 10000n;
  
  return (adjustedFees + adjustedGas).toString();
}

export const executeAvnuSwap = async (quote: Quote): Promise<string> => {
    const { accountAddress, privateKey, rpcUrl } = config.blockchain.starknet;

    if (!accountAddress || !privateKey || !rpcUrl) {
        throw new Error("Env variables not configured")
    }

    const provider = new RpcProvider({ nodeUrl: config.blockchain.starknet.rpcUrl });

    // The account we will use here has to be Griffin Account
    // We will confirm Griffin has received the payment, then use Griffin Account to execute these ones
    const account = new Account({
        address: accountAddress,
        signer: privateKey,
        provider
    })

    const { transactionHash } = await executeSwap({
        provider: account,
        quote,
        slippage: 0.005
    });

    return transactionHash
}