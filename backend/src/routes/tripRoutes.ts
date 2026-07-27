import { Router } from 'express';
import {
  getAllTrips,
  getTripById,
  createTrip,
  addCheckpoint,
  simulateAction,
  analyzeRisk,
  checkin,
  triggerEmergency
} from '../controllers/tripController';

const router = Router();

router.get('/', getAllTrips);
router.post('/', createTrip);
router.get('/:id', getTripById);
router.post('/:id/checkpoint', addCheckpoint);
router.post('/:id/simulate', simulateAction);
router.post('/:id/risk-analysis', analyzeRisk);
router.post('/:id/checkin', checkin);
router.post('/:id/trigger-emergency', triggerEmergency);

export default router;
