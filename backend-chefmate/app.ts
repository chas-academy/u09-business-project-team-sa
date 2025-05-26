import express, { Request, Response, Express } from 'express';
import cors, { CorsOptionsDelegate } from 'cors';
import { connectDB } from './src/database/db';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import spoonacularRoutes from './src/routes/spoonacularRoutes';

connectDB();
dotenv.config();

const app: Express = express();


// Middlewares

const corsOptions: CorsOptionsDelegate = (req, callback) => {
  const allowedOrigins: string[] = [
    'http://localhost:5173',
    'https://chef-mate.netlify.app'
  ];

  const origin = req.headers.origin || '';
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, { origin: true });
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// add more routes here - users / menu etc
app.use('/api/users', userRoutes);
app.use('/api/spoonacular', spoonacularRoutes);

// endpoint / routes
app.get('/', (req: Request, res: Response) => {
  res.send('API for ChefMate is up and running!');
});
 
// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;