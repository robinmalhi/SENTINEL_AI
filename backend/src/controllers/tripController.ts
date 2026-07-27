import { Request, Response } from 'express';
import { TripService } from '../services/tripService';

export const getAllTrips = (req: Request, res: Response) => {
  res.json(TripService.getAllTrips());
};

export const getTripById = (req: Request, res: Response) => {
  const { id } = req.params;
  const trip = TripService.getTripById(id);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  res.json(trip);
};

export const createTrip = (req: Request, res: Response) => {
  const trip = TripService.createTrip(req.body);
  res.status(201).json(trip);
};

export const addCheckpoint = (req: Request, res: Response) => {
  const { id } = req.params;
  const result = TripService.addCheckpoint(id, req.body);
  if (!result) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  res.json({ message: 'Checkpoint recorded', ...result });
};

export const simulateAction = (req: Request, res: Response) => {
  const { id } = req.params;
  const { action } = req.body;
  const trip = TripService.simulateAction(id, action);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  res.json({ message: `Simulated action '${action}' applied`, trip });
};

export const analyzeRisk = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TripService.analyzeRisk(id);
  if (!result) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  res.json(result);
};

export const checkin = (req: Request, res: Response) => {
  const { id } = req.params;
  const { pinCode, extendHours } = req.body;
  const result = TripService.checkin(id, pinCode, extendHours);
  if ('error' in result) {
    return res.status(result.status).json({ error: result.error });
  }
  res.json(result);
};

export const triggerEmergency = (req: Request, res: Response) => {
  const { id } = req.params;
  const trip = TripService.triggerEmergency(id);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  res.json({ message: 'Emergency dispatch payload created and distributed', trip });
};
