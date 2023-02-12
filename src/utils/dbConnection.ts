import mongoose from 'mongoose';
import { config } from '../config/config';
import Logger from './Logger';

async function connect(startServer: Function) {
    try {
        const dbUrl = config.mongo.url as string;
        await mongoose
            .connect(dbUrl)
            .then(() => {
                Logger.connect('Database Connected!');
            })
            .catch((error: any) => {
                Logger.error(error);
            });
        startServer();
    } catch (error) {
        Logger.error(error);
        process.exit(1);
    }
}

export default connect;
