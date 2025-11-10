import { Router, Request, Response } from "express";
import authRoutes from "./auth.routes";
import eventRoutes from "./event.routes";
import vendorRoutes from "./vendor.routes";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);
router.use("/events", eventRoutes);
router.use("/vendors", vendorRoutes);

export default router;
