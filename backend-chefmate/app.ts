import express, { Request, Response, Express } from "express";
import cors, { CorsOptionsDelegate } from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/database/db";
import userRoutes from "./src/routes/userRoutes";
import spoonacularRoutes from "./src/routes/spoonacularRoutes"; // <-- note the name
import authRoute from "./src/routes/authRoute";
import userMealPlanRoutes from "./src/routes/userMealPlanRoutes";

dotenv.config();
connectDB();

const app: Express = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://chef-mate.netlify.app"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/spoonacular", spoonacularRoutes);
app.use("/api/auth", authRoute);
app.use("/api/mealplan", userMealPlanRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API for ChefMate is up and running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
