"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorhandler_1 = __importDefault(require("./middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
// import router from './routes';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ['https://store-pro-three.vercel.app', 'http://localhost:5173'], credentials: true }));
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(globalErrorhandler_1.default);
// Not Found
app.use(notFound_1.default);
exports.default = app;
