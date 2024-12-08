import { Router } from 'express';
import authRoutes from './auth';
import productsRoutes from './products'
import { PrismaClient } from '@prisma/client';
import { SignupSchema } from '../schema/user';
import userRoutes from './user';
import cartRoutes from './cart';

const rootRouter:Router = Router();

rootRouter.use('/auth', authRoutes)
rootRouter.use('/products', productsRoutes)
rootRouter.use('/users', userRoutes)
rootRouter.use('/cart', cartRoutes) 


export const prismaClient = new PrismaClient({
    log: ['query']
})

export default rootRouter;