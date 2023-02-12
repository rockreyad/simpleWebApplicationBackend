"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
function routes(app) {
    /** Home Page */
    app.get('/', (req, res) => {
        res.status(200).send('Welcome to Simple Web application Api Service');
    });
    /**
     * Authentication : createAccount, login, logout, forgotPassword, resetPassword
     */
    /** User */
    app.post('/register', user_1.create_account);
    app.post('/login', user_1.login_user);
    app.get('/user', user_1.all_user);
}
exports.default = routes;
//# sourceMappingURL=index.js.map