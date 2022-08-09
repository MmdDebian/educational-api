"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("../utils/logger"));
const app_1 = __importDefault(require("../app"));
process.on('uncaughtException', (err) => {
    console.error('uncaughtException ' + err);
    logger_1.default.error(err);
});
process.on('unhandledRejection', (err) => {
    console.error('unhandled rejection ' + err);
    logger_1.default.error(err);
});
const port = config_1.default.get('http_port') || 3001;
app_1.default.listen(port, () => {
    console.clear();
    console.log(process.version);
    logger_1.default.info(`app runing on port ${port}`, { port });
    console.log(`app started at http://localhost:${port}`);
});
