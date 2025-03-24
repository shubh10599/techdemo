import { Request, Response } from "express";
import db from '../db/database';
import bcrypt from 'bcrypt';
import { FieldPacket, RowDataPacket } from "mysql2";

export const registration = async (req: Request, res: Response) => {
    console.log("Function called...");

    try {
        const { firstName, lastName, email, password, role } = req.body;
        if (!firstName || !lastName || !email || !password || !role) {
            res.status(404).send({
                message: "provide all fields!",
                status: false
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt)


            const newUser = await db.query(
                'INSERT INTO techdemo.user (firstName, lastName, email, password,role) VALUES (?, ?, ?, ?, ?)',
                [firstName, lastName, email, hash, role]
            );

            if (!newUser) {
                res.status(404).send({
                    message: "Error in query",
                    status: false
                })
            } else {
                res.status(200).send({
                    message: "registration successfully!",
                    status: true
                })
            }
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({
            messge: "Error in Registration Api",
        })
    }
}



export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).send({
                message: "provide all fields!",
                status: false
            });
        } else {
            const [olduser]: [RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM techdemo.user WHERE email=?', [email]);
            console.log(olduser[0]);

            if (!olduser) {
                res.status(404).send({
                    message: "Error in query",
                    status: false
                })
            } else {
                const compair = await bcrypt.compare(password, olduser[0].password);
                if (compair) {
                    if (olduser[0].role === 'admin') {
                        res.status(200).send({
                            message: "login successfully!",
                            status: false
                        })
                    } else {
                        res.status(404).send({
                            message: "you are not admin!",
                            status: true
                        })
                    }
                } else {
                    res.status(404).send({
                        message: "password is incorrect!"
                    })
                }
            }
        }
    } catch (err) {
        res.status(500).send({
            messge: "Error in Login Api"
        })
    }
}
