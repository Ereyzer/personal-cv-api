// src/routers/index.js

import { Router } from 'express';
import AdminRouter from './admin.ts';
import authRouter from './auth.js';

const router = Router();

router.use('/students', AdminRouter);
router.use('/auth', authRouter);

export default router;
