import { Express, Request, Response } from 'express';

import { all_user, create_account, login_user } from '../controllers/user';

function routes(app: Express) {
    /** Home Page */
    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('Welcome to Simple Web application Api Service');
    });

    /**
     * Authentication : createAccount, login, logout, forgotPassword, resetPassword
     */

    /** User */
    app.post('/register', create_account);
    app.post('/login', login_user);
    app.get('/user', all_user);
}

export default routes;
