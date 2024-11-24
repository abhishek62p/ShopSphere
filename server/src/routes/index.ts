import { Router } from 'express';
import authRoutes from './auth';
import { PrismaClient } from '@prisma/client';
import { SignupSchema } from '../schema/user';

const rootRouter:Router = Router();

rootRouter.use('/auth', authRoutes)

export const prismaClient = new PrismaClient({
    log: ['query']
})

export default rootRouter;