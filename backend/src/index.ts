import express from 'express';
import dotenv from 'dotenv';
import db from './db/database';
import route from './routes/user';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const Port = process.env.PORT || 3000;

app.use(route);

app.get('/', async (req, res) => {
    const user = await db.query('SELECT * FROM techdemo.user');

    res.send({
        data: user
    })
})
db.query("SELECT 1").then(() => {
    console.log("mysqk connected");

}).catch((err: any) => {
    console.log(err);

})

app.listen(Port, () => {
    console.log(`listen port ${Port}`);

})