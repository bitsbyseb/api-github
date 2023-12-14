import express, { Express } from 'express';
import ReposRouter from './repos.router'
const rootPath = process.env.API_ROOT_URL;

function routerApi(app: Express) {
    const router = express.Router();
    rootPath !== undefined ? app.use(rootPath, router) : '';
    router.use('/',ReposRouter);
}

export default routerApi;