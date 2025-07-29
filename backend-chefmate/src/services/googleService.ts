import express, { Request, Response } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cors from "cors";
import jwt from "jsonwebtoken";

const clientID =
  "805405718661-8tba2pt2ham5sgfv4q8omvehddc9ujdd.apps.googleusercontent.com";
const clientSecret = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        return done(null, profile);
      } catch (err) {
        return done(err as Error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj as Express.User);
});

const router = express.Router();

router.use(passport.initialize());

// --- GOOGLE AUTH ROUTES ---

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//  issue a JWT and send to frontend
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false,
  }),
  (req: Request, res: Response) => {
    const user = req.user as any;

    if (!user) {
      console.log("❌ Ingen användare i callback");
      return res.redirect("http://localhost:5173/login");
    }

    const payload = {
      id: user.id,
      name: user.displayName,
      email: user.emails?.[0]?.value,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // Redirect to frontend with token as query parameter
    
    console.log("✅ Token skapad:", token);
    res.redirect(`http://localhost:5173/oauth/callback?token=${token}`);
  }
);

//logout route
router.get("/auth/logout", (_req: Request, res: Response) => {
  res.sendStatus(200);
});

// Return current user info
router.get("/auth/user", (req: Request, res: Response) => {
  res.json(req.user || null);
});

export default router;
