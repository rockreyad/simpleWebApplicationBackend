"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all_user = exports.login_user = exports.create_account = void 0;
const user_service_1 = require("../service/user.service");
function getErrorStatus(error) {
    return error.status;
}
const create_account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: 'First Name , Last Name, Email and Password'
            });
        }
        const userInfo = {
            firstName,
            lastName,
            email,
            password,
            role: 'user'
        };
        const user = yield (0, user_service_1.createUser)(userInfo);
        return res.status(201).send({
            message: 'Registered successfully!',
            status: 201,
            data: user
        });
    }
    catch (error) {
        let status = getErrorStatus(error);
        res.status(status || 500).json({
            status: 'FAILED',
            message: error
        });
    }
});
exports.create_account = create_account;
const login_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are Required field'
        });
    }
    try {
        const userInfo = {
            email,
            password
        };
        const find_user = yield (0, user_service_1.findOneUser)({ email });
        if (!find_user) {
            throw {
                message: 'Not found!'
            };
        }
        else {
            if (find_user.password !== userInfo.password) {
                throw {
                    message: 'Password is incorrect'
                };
            }
        }
        return res.status(200).send({
            message: 'Login successfully!',
            status: 'SUCCESS',
            data: find_user.role
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
});
exports.login_user = login_user;
const all_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    const user = yield (0, user_service_1.findUser)({ filter });
    const allUser = user.map((user) => user);
    return res.status(200).send({
        message: 'All User Fetched successfully',
        data: allUser
    });
});
exports.all_user = all_user;
//# sourceMappingURL=user.js.map