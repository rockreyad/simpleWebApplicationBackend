"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const dayjs_1 = __importDefault(require("dayjs"));
class Logger {
}
exports.default = Logger;
_a = Logger;
Logger.log = (args) => _a.info(args);
Logger.info = (args) => console.log(chalk_1.default.blue(`[${(0, dayjs_1.default)().format()}] [INFO]`), typeof args === 'string' ? chalk_1.default.blueBright(args) : args);
Logger.warning = (args) => console.log(chalk_1.default.yellow(`[${(0, dayjs_1.default)().format()}] [WARN]`), typeof args === 'string' ? chalk_1.default.yellowBright(args) : args);
Logger.error = (args) => console.log(chalk_1.default.red(`[${(0, dayjs_1.default)().format()}] [ERROR]`), typeof args === 'string' ? chalk_1.default.redBright(args) : args);
//# sourceMappingURL=Log.js.map