import express from 'express';
import { Login, registration } from '../controllers/auth';

const route = express.Router();

route.post('/registration', registration);
route.post('/login', Login);

export default route;