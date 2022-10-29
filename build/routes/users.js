"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Welcome to User');
});
router.get('/home', users_1.homeDetail);
exports.default = router;
//# sourceMappingURL=users.js.map