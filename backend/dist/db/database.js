"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
// const password = process.env.PASSWORD
const db = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kush@1207',
    database: 'techdemo'
});
exports.default = db;
