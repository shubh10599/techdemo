"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const route = express_1.default.Router();
route.post('/registration', auth_1.registration);
route.post('/login', auth_1.Login);
exports.default = route;
