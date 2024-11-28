import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  '49939848628-43880hebju9j4mn6pqt1q3a97kp412t0.apps.googleusercontent.com',
  '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',
  `${process.env.REDIRECT_URI || 'http://localhost:5173/oauth/callback'}`
);

// Define the required scopes
const SCOPES = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.heart_rate.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.sleep.read',
  'https://www.googleapis.com/auth/fitness.oxygen_saturation.read',
  'https://www.googleapis.com/auth/fitness.blood_pressure.read',
  'https://www.googleapis.com/auth/fitness.blood_glucose.read',
  'https://www.googleapis.com/auth/fitness.nutrition.read',
  'https://www.googleapis.com/auth/fitness.body.read'
];

export async function fetchGoogleFitData(accessToken: string) {
  try {
    oauth2Client.setCredentials({
      access_token: accessToken,
      scope: SCOPES.join(' ')
    });

    const fitness = google.fitness({
      version: 'v1',
      auth: oauth2Client
    });

    const now = Date.now();
    const yesterday = now - (24 * 60 * 60 * 1000);
    const lastWeek = now - (7 * 24 * 60 * 60 * 1000);

    console.log('Making Google Fit API requests...');

    // Fetch all data in parallel
    const [
      stepsResponse,
      heartRateResponse,
      weightResponse,
      caloriesResponse,
      distanceResponse,
      activeMinutesResponse,
      sleepResponse
    ] = await Promise.all([
      // Steps data
      fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
          startTimeMillis: yesterday.toString(),
          endTimeMillis: now.toString()
        }
      }),
      // Heart rate data
      fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{ dataTypeName: 'com.google.heart_rate.bpm' }],
          startTimeMillis: yesterday.toString(),
          endTimeMillis: now.toString()
        }
      }),
      // Weight data
      fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{ dataTypeName: 'com.google.weight' }],
          startTimeMillis: lastWeek.toString(),
          endTimeMillis: now.toString()
        }
      }),
      // Calories data
      fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{ dataTypeName: 'com.google.calories.expended' }],
          startTimeMillis: yesterday.toString(),
          endTimeMillis: now.toString()
        }
      }),
      // Distance data
      fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{ dataTypeName: 'com.google.distance.delta' }],
          startTimeMillis: yesterday.toString(),
          endTimeMillis: now.toString()
        }
      }),
      // Active minutes
      fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{ dataTypeName: 'com.google.active_minutes' }],
          startTimeMillis: yesterday.toString(),
          endTimeMillis: now.toString()
        }
      }),
      // Sleep data
      fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{ dataTypeName: 'com.google.sleep.segment' }],
          startTimeMillis: yesterday.toString(),
          endTimeMillis: now.toString()
        }
      })
    ]);

    const processedData = {
      steps: calculateSteps(stepsResponse.data),
      heartRate: calculateHeartRate(heartRateResponse.data),
      weight: calculateWeight(weightResponse.data),
      calories: calculateCalories(caloriesResponse.data),
      distance: calculateDistance(distanceResponse.data),
      activeMinutes: calculateActiveMinutes(activeMinutesResponse.data),
      sleep: calculateSleep(sleepResponse.data)
    };

    console.log('Processed data:', processedData);
    return processedData;
  } catch (error) {
    console.error('Error fetching Google Fit data:', error);
    throw error;
  }
}

function calculateSteps(data: any) {
  if (!data.bucket || !data.bucket[0]?.dataset?.[0]?.point) {
    return 0;
  }
  return data.bucket[0].dataset[0].point.reduce((total: number, point: any) => {
    return total + (point.value?.[0]?.intVal || 0);
  }, 0);
}

function calculateHeartRate(data: any) {
  if (!data.bucket || !data.bucket[0]?.dataset?.[0]?.point) {
    return { average: 0, resting: 0 };
  }

  const points = data.bucket[0].dataset[0].point;
  const values = points
    .map((p: any) => p.value?.[0]?.fpVal)
    .filter((v: any) => typeof v === 'number');

  if (values.length === 0) {
    return { average: 0, resting: 0 };
  }

  return {
    average: Math.round(values.reduce((a: number, b: number) => a + b) / values.length),
    resting: Math.round(Math.min(...values))
  };
}

function calculateWeight(data: any) {
  if (!data.bucket || !data.bucket[0]?.dataset?.[0]?.point) {
    return null;
  }

  const points = data.bucket[0].dataset[0].point;
  const values = points
    .map((p: any) => p.value?.[0]?.fpVal)
    .filter((v: any) => typeof v === 'number');

  if (values.length === 0) return null;

  // Return the most recent weight
  return Math.round(values[values.length - 1] * 10) / 10;
}

function calculateCalories(data: any) {
  if (!data.bucket || !data.bucket[0]?.dataset?.[0]?.point) {
    return 0;
  }

  return data.bucket[0].dataset[0].point.reduce((total: number, point: any) => {
    return total + (point.value?.[0]?.fpVal || 0);
  }, 0);
}

function calculateDistance(data: any) {
  if (!data.bucket || !data.bucket[0]?.dataset?.[0]?.point) {
    return 0;
  }

  const totalMeters = data.bucket[0].dataset[0].point.reduce((total: number, point: any) => {
    return total + (point.value?.[0]?.fpVal || 0);
  }, 0);

  // Convert to kilometers and round to 2 decimal places
  return Math.round(totalMeters / 100) / 10;
}

function calculateActiveMinutes(data: any) {
  if (!data.bucket || !data.bucket[0]?.dataset?.[0]?.point) {
    return 0;
  }

  return data.bucket[0].dataset[0].point.reduce((total: number, point: any) => {
    return total + (point.value?.[0]?.intVal || 0);
  }, 0);
}

function calculateSleep(data: any) {
  if (!data.bucket || !data.bucket[0]?.dataset?.[0]?.point) {
    return null;
  }

  const points = data.bucket[0].dataset[0].point;
  let totalSleepMs = 0;
  let sleepQuality = 0;

  points.forEach((point: any) => {
    const startTimeMillis = parseInt(point.startTimeNanos) / 1000000;
    const endTimeMillis = parseInt(point.endTimeNanos) / 1000000;
    const duration = endTimeMillis - startTimeMillis;
    totalSleepMs += duration;

    // Sleep quality based on sleep stages (if available)
    const sleepStage = point.value?.[0]?.intVal;
    if (sleepStage) {
      // Assign quality scores based on sleep stages
      // 1: Awake (0%), 2: Light sleep (50%), 3: Deep sleep (100%), 4: REM (75%)
      const qualityMap: { [key: number]: number } = { 1: 0, 2: 50, 3: 100, 4: 75 };
      sleepQuality += (qualityMap[sleepStage] || 0) * (duration / totalSleepMs);
    }
  });

  if (totalSleepMs === 0) return null;

  return {
    duration: Math.round(totalSleepMs / 1000), // Convert to seconds
    quality: Math.round(sleepQuality)
  };
} 