import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectToDatabase } from './db';
import { CORS_ORIGIN, PORT } from '../constants';

export const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: CORS_ORIGIN,
  })
);
app.use(cookieParser());

export const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
