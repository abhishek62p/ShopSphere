import express, {Express, Request, Response } from 'express';
import { PORT } from './secrets';
import rootRouter from './routes';
import { errorMiddleware } from './middlewares/error';
import { PrismaClient } from '@prisma/client';

const app:Express = express()

app.use(express.json())
app.use('/api/v1', rootRouter)

app.use(errorMiddleware)

app.listen(PORT, () => console.log('App is working!'))