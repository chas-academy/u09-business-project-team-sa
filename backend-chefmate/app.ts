import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { connectDB } from "./src/database/db";
import userRoutes from "./src/routes/userRoutes";
import userMealPlanRoutes from "./src/routes/userMealPlanRoutes";
import googleAuthRoutes from "./src/services/googleService";


dotenv.config();
connectDB();

const app: Express = express();

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not defined in .env file");
}

// Session is required so Passport can store the OAuth state between
// /auth/google and /auth/google/callback.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/api/mealplan", userMealPlanRoutes);
app.use(googleAuthRoutes);

// Base route
app.get("/", (req: Request, res: Response) => {
  res.send("API for ChefMate is up and running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
