import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { config } from './config/config';

dotenv.config();

const app: Express = express();
const port = config.server.port;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to Rest Api Service');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
