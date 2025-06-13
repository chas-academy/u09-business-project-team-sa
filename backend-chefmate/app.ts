import express, { Request, Response, Express } from "express";
import cors, { CorsOptionsDelegate } from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/database/db";
import userRoutes from "./src/routes/userRoutes";
import spoonacularRoutes from "./src/routes/spoonacularRoutes"; // <-- note the name
import authRoute from "./src/routes/authRoute";
import userMealPlanRoutes from "./src/routes/userMealPlanRoutes";
import spoonacularRoutes from "./src/routes/spoonacularRoutes";

dotenv.config();
connectDB();

const app: Express = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://chef-mate.netlify.app",
  ];

  const origin = req.headers.origin || "";
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, {
      origin: true,
      credentials: true, 
    });
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};


app.use(cors(corsOptions));

//  Optional, but good for preflight (OPTIONS) requests
app.options("*", cors(corsOptions));

// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/spoonacular", spoonacularRoutes);
app.use("/api/auth", authRoute);
app.use("/api/mealplan", userMealPlanRoutes);

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
