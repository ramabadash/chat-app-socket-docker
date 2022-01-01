"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnection = void 0;
// DB
const users_1 = __importDefault(require("../db/users"));
// io
const server_1 = require("../server");
// Functions
const socketOnMessage_1 = require("./socketOnMessage");
const socketDisconnected_1 = require("./socketDisconnected");
const onConnection = (socket) => {
    /***** ON CONNECTION *****/
    const name = socket.handshake.auth.username;
    users_1.default.push({ id: socket.id, name }); // Update users list
    // Update users about the login by message
    socket.broadcast.emit('replay', {
        name,
        message: 'Enter to the chat',
    });
    server_1.io.emit('userActivity', users_1.default); // Send user activity details
    /***** ON MESSAGE *****/
    // On message event reply to the client
    socket.on('message', ({ name, message, to }) => {
        const messageObj = { name, message, to };
        (0, socketOnMessage_1.onMessage)(messageObj, socket.id);
    });
    /***** ON TYPING *****/
    socket.on('userTyping', ({ name, type }) => {
        socket.broadcast.emit('userTypingReplay', { name, type });
    });
    /***** ON DISCONNECTION *****/
    socket.on('disconnect', () => {
        (0, socketDisconnected_1.onDisconnected)(name, socket); // On user disconnecting
    });
};
exports.onConnection = onConnection;
