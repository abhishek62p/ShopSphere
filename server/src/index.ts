import express, {Express, Request, Response } from 'express';
import { PORT } from './secrets';
import rootRouter from './routes';

const app:Express = express()

app.use(express.json())
app.use('/api/v1', rootRouter)

app.listen(PORT, () => console.log('App is working!'))