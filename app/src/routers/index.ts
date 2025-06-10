import express, { Router } from 'express';
import AdminRouter from './admin.ts';
import authRouter from './auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';

const router = Router();

router.use('/', ctrlWrapper(express.static('/static')));
router.use('/admin', AdminRouter);
router.use('/auth', authRouter);

export default router;
