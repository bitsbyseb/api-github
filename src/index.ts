'use strict';
import cors from 'cors';
import express from 'express';
import routerApi from './routes/index';
import dotenv from 'dotenv';
import {handleError,logError} from './middlewares/errors';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logError);
app.use(handleError);
routerApi(app);

app.listen(process.env.PORT,()=> {
    console.log("running on http://localhost:"+process.env.PORT);
});
