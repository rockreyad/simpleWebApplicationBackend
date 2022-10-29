import { Express, Request, Response } from 'express';
import { create_user, delete_user, find_user, update_user } from '../controllers/users';

function routes(app: Express) {
    /** Home Page */
    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('Welcome to Rest Api Service');
    });

    /** User :  */
    app.post('/create', create_user);
    app.patch('/update', update_user);
    app.get('/find', find_user);
    app.delete('/delete', delete_user);

    /** About Page */
    app.get('/about', (req: Request, res: Response) => {
        res.status(200).send({
            message: 'We are working only for your service'
        });
    });
}

export default routes;
