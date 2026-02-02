import { Intent, CreateIntentRequest } from '../types';
export declare class IntentService {
    private intents;
    createIntent(request: CreateIntentRequest): Promise<Intent>;
    getIntent(intentId: string): Promise<Intent | null>;
    executeIntent(intentId: string): Promise<Intent>;
    cancelIntent(intentId: string): Promise<void>;
    private validateIntent;
}
//# sourceMappingURL=IntentService.d.ts.map