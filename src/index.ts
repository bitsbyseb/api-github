'use strict';
import cors from 'cors';
import express from 'express';
import routerApi from './routes/index';
import dotenv from 'dotenv';
import {handleError,logError,boomErrorHandler} from './middlewares/errors';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
routerApi(app);

app.use(boomErrorHandler);
app.use(logError);
app.use(handleError);

app.listen(3000,()=> {
    console.log("running on http://localhost:"+3000);
});
