import express, { Request, Response } from 'express';
import cors from 'cors';
import { fetchGoogleFitData } from './api/googlefit';

const app = express();

// Error handling wrapper
const asyncHandler = (fn: Function) => (req: Request, res: Response) => {
  Promise.resolve(fn(req, res)).catch((error) => {
    console.error('Server Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  });
};

// Configure CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://fit-hojao.vercel.app'] 
    : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Basic request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Root endpoint
app.get('/', asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: 'API is running', timestamp: new Date().toISOString() });
}));

// Health check endpoint
app.get('/health', asyncHandler(async (req: Request, res: Response) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
}));

// Google Fit data endpoint
const googleFitHandler = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json({ error: 'No access token provided' });
    }

    const data = await fetchGoogleFitData(accessToken);
    res.json(data);
  } catch (error: any) {
    console.error('Google Fit Error:', error);
    
    if (error.code === 401) {
      return res.status(401).json({ 
        error: 'Unauthorized access to Google Fit API',
        details: error.message
      });
    }

    if (error.code === 403) {
      return res.status(403).json({ 
        error: 'Access forbidden to Google Fit API',
        details: error.message
      });
    }

    res.status(500).json({ 
      error: 'Failed to fetch Google Fit data',
      details: error.message
    });
  }
};

app.get('/googlefit/data', asyncHandler(googleFitHandler));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app; 