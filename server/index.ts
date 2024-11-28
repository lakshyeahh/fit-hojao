import express, { RequestHandler, Request, Response } from 'express';
import cors from 'cors';
import { fetchGoogleFitData } from './api/googlefit';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Google Fit data endpoint
const googleFitHandler: RequestHandler = async (req, res) => {
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

app.get('/api/googlefit/data', googleFitHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 