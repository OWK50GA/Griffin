import { config } from '@/config'
import { IntentMessageType, SignatureType } from '@/types';
import { RpcProvider, Signature, TypedData, validateAndParseAddress } from "starknet"

const validateStarknetAddress = (address: string): boolean => {
    const isValid = !!(validateAndParseAddress(address));
    return isValid;
}

export const validateAddress = (chainId: string, address: string): boolean => {
    if (chainId.startsWith('starknet')) {
        return validateStarknetAddress(address)
    }

    // EVMs would be: if chainId.startsWith(eip155);

    return false
}

// TODO: Implement Signature Validation for Starknet
const validateStarknetSignature = async (signature: Signature, message: TypedData, userAddress: string | `0x${string}`): Promise<boolean> => {
    const provider = new RpcProvider({ nodeUrl: config.blockchain.starknet.rpcUrl });

    const verifyResponse = await provider.verifyMessageInStarknet(message, signature, userAddress);

    return verifyResponse
}

export const validateSignature = async (chainId: string, signature: SignatureType, message: IntentMessageType, userAddress: string | `0x${string}`): Promise<boolean> => {
    if (chainId.startsWith('starknet')) {
        return await validateStarknetSignature(signature as Signature, message as TypedData, userAddress);
    }

    return false
}