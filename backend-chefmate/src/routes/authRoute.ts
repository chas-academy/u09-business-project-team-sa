import { Router, Request, Response } from "express";
import { verifyGoogleToken } from "../services/googleService";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/google-login", async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;
    if (!token)  res.status(400).json({ error: "Missing token" });

     try {
    const googleUser = await verifyGoogleToken(token);

    // Check if user exists
    let user = await User.findOne({ email: googleUser.email });

    // If not, create a new one
    if (!user) {
      user = await User.create({
        username: googleUser.name,
        email: googleUser.email,
        password: "", // No password needed for Google login
        picture: googleUser.picture,
      });
    }

    // Create JWT
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ error: "Missing JWT_SECRET in env" });
      return;
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Google login successful",
      token: jwtToken,
      user: { 
        username: user.username, 
        email: user.email 
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ error: (error as Error).message });
  }
});

export default router;