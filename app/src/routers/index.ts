import express, { Router } from 'express';
import AdminRouter from './admin.ts';
import authRouter from './auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import { corsCallBAck } from '../utils/corsCAllback.ts';
import cors from 'cors';

const router = Router();

router.use('/', ctrlWrapper(express.static('/static')));
router.use('/admin', cors(corsCallBAck), AdminRouter);
router.use('/auth', cors(corsCallBAck), authRouter);

export default router;
