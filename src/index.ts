'use strict';
import cors from 'cors';
import express from 'express';
import routerApi from './routes/index';
import dotenv from 'dotenv';
import { handleError, logError, boomErrorHandler } from './middlewares/errors';
dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:3000',
    'http://https://bitsbyseb.github.io/'];

app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {

        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
routerApi(app);

app.use(boomErrorHandler);
app.use(logError);
app.use(handleError);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log("running on http://localhost:" + PORT);
});
