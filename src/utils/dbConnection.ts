import mongoose from 'mongoose';
import { config } from '../config/config';
import Logger from './Logger';

async function connect() {
    try {
        const dbUrl = config.mongo.url as string;
        await mongoose.connect(dbUrl);
        Logger.info('Database Connected!');
    } catch (error) {
        Logger.error(error);
        process.exit(1);
    }
}

export default connect;
