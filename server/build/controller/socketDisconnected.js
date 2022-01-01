"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDisconnected = void 0;
// DB
const users_1 = __importDefault(require("../db/users"));
// io
const server_1 = require("../server");
const onDisconnected = (name, socket) => {
    server_1.io.emit('replay', { name, message: 'disconnected' }); // Send disconnected user message
    // Remove user from USERS arr
    const userIndex = users_1.default.indexOf({
        id: socket.id,
        name,
    }); // delete the user that disconnected
    users_1.default.splice(userIndex, 1);
    // Send user activity details
    server_1.io.emit('userActivity', users_1.default);
};
exports.onDisconnected = onDisconnected;
