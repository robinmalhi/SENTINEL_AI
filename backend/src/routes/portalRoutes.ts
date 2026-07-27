import { Router } from 'express';
import { getEmbassyPortal, getPolicePortal } from '../controllers/portalController';

const router = Router();

router.get('/embassy/portal', getEmbassyPortal);
router.get('/police/portal', getPolicePortal);

export default router;
