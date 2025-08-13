import express, { Router } from 'express';
import AdminRouter from './admin.ts';
import authRouter from './auth.js';
import contactRouter from './contact.ts';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import { corsCallBAck } from '../utils/corsCAllback.ts';
import cors from 'cors';

const router = Router();

router.use('/', ctrlWrapper(express.static('/static')));
router.use('/admin', cors(corsCallBAck), AdminRouter);
router.use('/auth', cors(corsCallBAck), authRouter);
router.use('/contactme', cors(corsCallBAck), contactRouter);

export default router;
