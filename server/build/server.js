"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
/***** VARIABLES *****/
// Importing module
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
// Create server
const app = (0, express_1.default)();
const PORT = 4000;
const http = require('http').createServer(app);
// io
exports.io = new socket_io_1.Server(http, {
    cors: { origin: ['http://localhost:3000'] },
});
// Functions
const socketConnection_1 = require("./controller/socketConnection");
// Routers
const user_1 = __importDefault(require("./routers/user"));
/***** MIDDLEWARES *****/
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/***** IO *****/
exports.io.on('connection', socketConnection_1.onConnection); // On socket connection
/***** ROUTERS *****/
app.use('/users', user_1.default);
http.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}`);
});
