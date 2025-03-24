"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.registration = void 0;
const database_1 = __importDefault(require("../db/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Function called...");
    try {
        const { firstName, lastName, email, password, role } = req.body;
        if (!firstName || !lastName || !email || !password || !role) {
            res.status(404).send({
                message: "provide all fields!",
                status: false
            });
        }
        else {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(password, salt);
            const newUser = yield database_1.default.query('INSERT INTO techdemo.user (firstName, lastName, email, password,role) VALUES (?, ?, ?, ?, ?)', [firstName, lastName, email, hash, role]);
            if (!newUser) {
                res.status(404).send({
                    message: "Error in query",
                    status: false
                });
            }
            else {
                res.status(200).send({
                    message: "registration successfully!",
                    status: true
                });
            }
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            messge: "Error in Registration Api",
        });
    }
});
exports.registration = registration;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).send({
                message: "provide all fields!",
                status: false
            });
        }
        else {
            const [olduser] = yield database_1.default.query('SELECT * FROM techdemo.user WHERE email=?', [email]);
            console.log(olduser[0]);
            if (!olduser) {
                res.status(404).send({
                    message: "Error in query",
                    status: false
                });
            }
            else {
                const compair = yield bcrypt_1.default.compare(password, olduser[0].password);
                if (compair) {
                    if (olduser[0].role === 'admin') {
                        res.status(200).send({
                            message: "login successfully!",
                            status: false
                        });
                    }
                    else {
                        res.status(404).send({
                            message: "you are not admin!",
                            status: true
                        });
                    }
                }
                else {
                    res.status(404).send({
                        message: "password is incorrect!"
                    });
                }
            }
        }
    }
    catch (err) {
        res.status(500).send({
            messge: "Error in Login Api"
        });
    }
});
exports.Login = Login;
