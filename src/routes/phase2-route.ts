import express from 'express';
import { createAstralObjectsLogo, removeAstralObjectsLogo } from '../controllers/phase2-controller';

const router = express.Router();

router.post('/', createAstralObjectsLogo);
router.delete('/', removeAstralObjectsLogo);

export default router;
