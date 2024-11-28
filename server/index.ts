import express, { Request, Response } from 'express';
import cors from 'cors';
import { fetchGoogleFitData } from './api/googlefit';

const app = express();

// Configure CORS for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://fit-hojao.vercel.app'] 
    : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Google Fit data endpoint
const googleFitHandler = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      console.error('No access token provided');
      res.status(401).json({ error: 'No access token provided' });
      return;
    }

    console.log('Fetching Google Fit data with token:', accessToken.substring(0, 10) + '...');
    const data = await fetchGoogleFitData(accessToken);
    console.log('Successfully fetched Google Fit data:', data);
    res.json(data);
  } catch (error: any) {
    console.error('Error in Google Fit handler:', error);
    
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

app.get('/googlefit/data', googleFitHandler);

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app; 