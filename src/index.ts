'use strict';
import cors from 'cors';
import express from 'express';
import routerApi from './routes/index';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
routerApi(app);

app.listen(process.env.PORT,()=> {
    console.log("running on http://localhost:"+process.env.PORT);
});
