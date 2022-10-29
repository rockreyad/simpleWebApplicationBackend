"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const User = users_1.default;
const db = {
    model: {
        User
    },
    doc: {
        UserDocument
    }
};
exports.default = db;
//# sourceMappingURL=index.js.map