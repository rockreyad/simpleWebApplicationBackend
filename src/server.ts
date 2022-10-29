import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import http from 'http';
import { config } from './config/config';
import routes from './routes';
import connect from './utils/dbConnection';
import Logger from './utils/Logger';

dotenv.config();

const app: Express = express();
const port = config.server.port;

const connectMongo = async (startServer: Function) => {
    try {
        /** Create connection with Mongo first then create our http server */
        await connect(startServer);
    } catch (error) {
        throw error;
    }
};

/** Create Connection : Mongo & Server */
connectMongo(startServer);

function startServer() {
    /** Log the request */
    app.use((req: Request, res: Response, next: NextFunction) => {
        /** Log the client request */
        Logger.incoming(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the server response */
            Logger.response(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    /** Rules for our Api */
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Acess-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE');

            return res.status(200).json({});
        }
        next();
    });

    /** Error Handling */ //BUG: Not working
    // app.use((req: Request, res: Response, next: NextFunction) => {
    //     const error = new Error('Not found');
    //     res.status(404).json({
    //         message: error.message
    //     });

    //     next();
    // });

    /** Create Http Server to run application */
    http.createServer(app).listen(port, async (): Promise<void> => {
        Logger.info(`⚡: Server is running at https://localhost:${port}`);

        /** Routes Index */
        routes(app);
    });
}
