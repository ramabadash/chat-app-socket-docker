"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_1 = __importDefault(require("../db/users"));
// Check ig username is available
router.post('/:username', (req, res) => {
    const { username } = req.params;
    for (const user of users_1.default) {
        if (user.name === username) {
            throw { status: 400, message: 'Username is taken! choose another one' };
        }
    }
    res.send(username);
});
exports.default = router;
