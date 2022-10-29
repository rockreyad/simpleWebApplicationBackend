"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const users_1 = __importDefault(require("../models/users"));
function createUser(input) {
    return users_1.default.create();
}
exports.createUser = createUser;
//# sourceMappingURL=user.js.map