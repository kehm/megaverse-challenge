import express from 'express';
import phase1Route from './routes/phase1-route';
import phase2Route from './routes/phase2-route';

const router = express.Router();

router.use('/phase1', phase1Route);
router.use('/phase2', phase2Route);

export default router;
