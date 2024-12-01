import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import { fetchGoogleFitData } from './api/googlefit';

const app = express();

const REDIRECT_URI = process.env.NODE_ENV === 'production'
  ? 'https://guardian-main.vercel.app/oauth/callback'
  : 'http://localhost:3000/oauth/callback';

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
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://guardian-main.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
const googleFitHandler: RequestHandler = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      res.status(401).json({ error: 'No access token provided' });
      return;
    }

    const data = await fetchGoogleFitData(accessToken);
    res.json(data);
  } catch (error: any) {
    console.error('Google Fit Error:', error);
    
    if (error.code === 401) {
      res.status(401).json({ 
        error: 'Unauthorized access to Google Fit API',
        details: error.message
      });
      return;
    }

    if (error.code === 403) {
      res.status(403).json({ 
        error: 'Access forbidden to Google Fit API',
        details: error.message
      });
      return;
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