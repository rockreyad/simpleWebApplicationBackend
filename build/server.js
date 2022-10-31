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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const config_1 = require("./config/config");
const routes_1 = __importDefault(require("./routes"));
const dbConnection_1 = __importDefault(require("./utils/dbConnection"));
const Logger_1 = __importDefault(require("./utils/Logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = config_1.config.server.port;
const connectMongo = (startServer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /** Create connection with Mongo first then create our http server */
        yield (0, dbConnection_1.default)(startServer);
    }
    catch (error) {
        throw error;
    }
});
/** Create Connection : Mongo & Server */
connectMongo(startServer);
function startServer() {
    /** Log the request */
    app.use((req, res, next) => {
        /** Log the client request */
        Logger_1.default.incoming(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log the server response */
            Logger_1.default.response(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    /** Rules for our Api */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Acess-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE');
            return res.status(200).json({});
        }
        next();
    });
    /** Create Http Server to run application */
    http_1.default.createServer(app).listen(port, () => __awaiter(this, void 0, void 0, function* () {
        Logger_1.default.info(`⚡: Server is running at https://localhost:${port}`);
        /** Routes Index */
        (0, routes_1.default)(app);
        /** Error Handling */
        app.use((req, res, next) => {
            const error = new Error('Not found');
            res.status(404).json({
                message: error.message
            });
            next();
        });
    }));
}
//# sourceMappingURL=server.js.map