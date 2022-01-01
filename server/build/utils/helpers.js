"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameById = void 0;
const users_1 = __importDefault(require("../db/users"));
const getNameById = (id) => {
    if (id) {
        for (const user of users_1.default) {
            if (user.id === id) {
                return user.name;
            }
        }
    }
    return '';
};
exports.getNameById = getNameById;
