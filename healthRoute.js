import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/predict-test', async (req, res) => {
  try {
    const response = await axios.post(
      'https://h-stroke-1.onrender.com/predict',
      new URLSearchParams({
        feature0:1,
        feature1: 0,
        feature2: 1,
        feature3: 0,
        feature4: 1,
        feature5: 0,
        feature6: 0,
        feature7: 0,
        feature8: 0,
        feature9: 1,
        feature10: 0,
        feature11: 1,
        feature12: 0,
        feature13: 0,
        feature14: 0,
        feature15: 1,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    res.send(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to fetch prediction from ML model");
  }
});

export default router;
