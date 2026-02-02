import { RouteInfo, QuoteRequest } from '../types';
export declare class RouteService {
    findBestRoutes(request: QuoteRequest): Promise<RouteInfo[]>;
    private findSwapRoute;
    private findBridgeRoutes;
    private createBridgeRoute;
}
//# sourceMappingURL=RouteService.d.ts.map