import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import companyRoutes from './routes/company.routes';
import serviceRoutes from './routes/service.routes';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// 1. Global middleware (runs on every request)
app.use(cors());
app.use(express.json());
app.use(logger);

// 2. Routes
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.use('/companies', companyRoutes);
app.use('/services', serviceRoutes);

// 3. Unknown routes → 404 JSON (instead of "Cannot GET /")
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
});

// 4. Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});