import { Router, type Request, type Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { ChainService } from '../services/ChainService';

const router: Router = Router();
const chainService = new ChainService();

// GET /api/v1/chains - Get supported chains
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const chains = await chainService.getSupportedChains();
  res.json({ chains });
}));

// GET /api/v1/chains/:chainId/tokens - Get supported tokens for a chain
router.get('/:chainId/tokens', asyncHandler(async (req: Request, res: Response) => {
  const chainId = parseInt(req.params.chainId, 10);
  const tokens = await chainService.getSupportedTokens(chainId);
  res.json({ tokens });
}));

export default router;