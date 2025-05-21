import express, { Express, Request, Response } from 'express';
import cors, { CorsOptionsDelegate } from 'cors';
import { connectDB } from './src/database/db';
import dotenv from 'dotenv';

connectDB();
dotenv.config();

const app: Express = express();


// Middlewares

const corsOptions: CorsOptionsDelegate = (req, callback) => {
  const allowedOrigins: string[] = [
    // add frontend URL(s) here, e.g., 'http://localhost:5173'
  ];

  const origin = req.headers.origin || '';
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, { origin: true });
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

app.use(cors(corsOptions));
// app.use(cors({
//     origin: (origin, callback) => {
//         const allowedOrigins = [
//           // add frontent URLS here
//         ];
//        if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     } 
//     },
//     credentials: false, // disable whilst no login function
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//     allowedHeaders: ['Content-Type'],
// }));

//body parsers
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// endpoint / routes
app.get('/', (req, res) => {
  res.send('API for ChefMate is up and running!');
});
 
// add more routes here - users / menu etc


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;