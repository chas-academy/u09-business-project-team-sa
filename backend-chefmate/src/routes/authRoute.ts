import { Router, Request, Response } from "express";
import { verifyGoogleToken } from "../services/googleService";

const router = Router();

router.post(
  "/google-login",
  async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;
    if (!token)  res.status(400).json({ error: "Missing token" });

    try {
      const user = await verifyGoogleToken(token);
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }
);

export default router;
