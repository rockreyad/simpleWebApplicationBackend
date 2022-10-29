"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
function routes(app) {
    /** Home Page */
    app.get('/', (req, res) => {
        res.status(200).send('Welcome to Rest Api Service');
    });
    /** User :  */
    app.post('/create', users_1.create_user);
    app.patch('/update', users_1.update_user);
    app.get('/find', users_1.find_user);
    app.delete('/delete', users_1.delete_user);
    /** About Page */
    app.get('/about', (req, res) => {
        res.status(200).send({
            message: 'We are working only for your service'
        });
    });
}
exports.default = routes;
//# sourceMappingURL=index.js.map