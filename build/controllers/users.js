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
exports.delete_user = exports.find_user = exports.update_user = exports.create_user = void 0;
const user_service_1 = require("../service/user.service");
const create_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, dept } = req.body;
        const newUser = {
            name,
            dept
        };
        const user = yield (0, user_service_1.createUser)(newUser);
        return res.status(201).send({
            message: 'A new Student has been recorded',
            data: user
        });
    }
    catch (error) {
        res.status(400).send({
            message: error
        });
    }
});
exports.create_user = create_user;
const update_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, dept } = req.body;
        const user = yield (0, user_service_1.findAndUpdate)({ name }, { dept }, { new: true });
        return res.status(200).send({
            message: 'User details has been updated',
            data: user
        });
    }
    catch (error) {
        res.status(400).send({
            message: error
        });
    }
});
exports.update_user = update_user;
const find_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const user = yield (0, user_service_1.findUser)({ _id: id });
        return res.status(200).send({
            message: 'Here are the details of this User',
            data: user
        });
    }
    catch (error) {
        res.status(400).send({
            message: error
        });
    }
});
exports.find_user = find_user;
const delete_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const user = yield (0, user_service_1.deleteUser)({ _id: id });
        return res.status(200).send({
            status: 'SUCCESS',
            message: 'User details has been deleted'
        });
    }
    catch (error) {
        res.status(400).send({
            message: error
        });
    }
});
exports.delete_user = delete_user;
//# sourceMappingURL=users.js.map