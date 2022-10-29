"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const dayjs_1 = __importDefault(require("dayjs"));
const request = chalk_1.default.hex('#384cc9');
const requestBright = chalk_1.default.hex('#5769d9');
const response = chalk_1.default.hex('#17bd89');
const responsebright = chalk_1.default.hex('#3ec99e');
class Logger {
}
exports.default = Logger;
_a = Logger;
Logger.log = (args) => _a.info(args);
Logger.info = (args) => console.log(chalk_1.default.blue(`[${(0, dayjs_1.default)().format('DD-MM-YYYY HH:mm')}] [❕]`), typeof args === 'string' ? chalk_1.default.blueBright(args) : args);
Logger.connect = (args) => console.log(chalk_1.default.green(`[${(0, dayjs_1.default)().format('DD-MM-YYYY HH:mm')}] [🔛]`), typeof args === 'string' ? chalk_1.default.greenBright(args) : args);
Logger.incoming = (args) => console.log(request(`[${(0, dayjs_1.default)().format('DD-MM-YYYY HH:mm')}] [❔]`), typeof args === 'string' ? requestBright(args) : args);
Logger.response = (args) => console.log(response(`[${(0, dayjs_1.default)().format('DD-MM-YYYY HH:mm')}] [✅]`), typeof args === 'string' ? responsebright(args) : args);
Logger.warning = (args) => console.log(chalk_1.default.yellow(`[${(0, dayjs_1.default)().format('DD-MM-YYYY HH:mm')}] [⚠️]`), typeof args === 'string' ? chalk_1.default.yellowBright(args) : args);
Logger.error = (args) => console.log(chalk_1.default.red(`[${(0, dayjs_1.default)().format('DD-MM-YYYY HH:mm')}] [❌]`), typeof args === 'string' ? chalk_1.default.redBright(args) : args);
//# sourceMappingURL=Logger.js.map