import express from 'express';
import cors from 'cors';
import { config } from './config';
import tripRoutes from './routes/tripRoutes';
import assistantRoutes from './routes/assistantRoutes';
import portalRoutes from './routes/portalRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'Sentinel AI Standalone Emergency Server',
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/trips', tripRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api', portalRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(Number(config.port), '0.0.0.0', () => {
  console.log(`Sentinel AI Standalone Backend Server running on port ${config.port}`);
});
