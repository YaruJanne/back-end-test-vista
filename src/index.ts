import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());           // allow requests from the Flutter app
app.use(express.json());   // parse JSON request bodies into req.body

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});