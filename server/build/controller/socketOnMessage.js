"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
const moment = require('moment');
const server_1 = require("../server");
// Helpers
const helpers_1 = require("../utils/helpers");
const onMessage = (message, id) => {
    const messageObj = {
        name: message.name,
        message: message.message,
        to: (0, helpers_1.getNameById)(message.to),
    };
    if (!message.to) {
        server_1.io.emit('replay', Object.assign(Object.assign({}, messageObj), { timeStamp: moment().format('lll') }));
    }
    else {
        server_1.io.to([message.to, id]).emit('replay', Object.assign(Object.assign({}, messageObj), { timeStamp: moment().format('lll') }));
    }
};
exports.onMessage = onMessage;
