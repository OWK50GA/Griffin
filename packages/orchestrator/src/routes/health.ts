import { Router, type Request, type Response } from "express";
import { asyncHandler } from "../middleware/errorHandler";
import { HealthService } from "../services/HealthService";

const router: Router = Router();
const healthService = new HealthService();

// GET /api/v1/health - Health check endpoint
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const healthStatus = await healthService.getHealthStatus();

    const statusCode = healthStatus.status === "healthy" ? 200 : 503;
    res.status(statusCode).json(healthStatus);
  }),
);

export default router;
