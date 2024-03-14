import express from 'express';
import { createPolyanetCross, removePolyanetCross } from '../controllers/phase1-controller';

const router = express.Router();

router.post('/', createPolyanetCross);
router.delete('/', removePolyanetCross);

export default router;
