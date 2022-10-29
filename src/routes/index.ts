import { Express } from 'express';
import user from '../routes/user';
function routes(app: Express) {
    app.use('/user', user);
}

export default routes;
