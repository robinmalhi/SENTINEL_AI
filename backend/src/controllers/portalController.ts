import { Request, Response } from 'express';
import { TripService } from '../services/tripService';

export const getEmbassyPortal = (req: Request, res: Response) => {
  const allTrips = TripService.getAllTrips();
  const alerts = allTrips.filter(t => t.status === 'risk_warning' || t.status === 'critical_emergency' || t.riskLevel === 'High' || t.riskLevel === 'Critical');
  res.json({
    totalMonitoredTourists: allTrips.length,
    activeDistressAlerts: alerts.length,
    alerts
  });
};

export const getPolicePortal = (req: Request, res: Response) => {
  const allTrips = TripService.getAllTrips();
  const alerts = allTrips.filter(t => t.status === 'critical_emergency' || t.riskLevel === 'Critical' || (t.latestRiskReport && t.latestRiskReport.policeActionRequired));
  res.json({
    activeSearchOperations: alerts.length,
    highPriorityCases: alerts
  });
};
