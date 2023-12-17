import express from 'express';
import ReposService from '../services/repos.service';

const router = express.Router();
const service = new ReposService();

const interval = setInterval(() => {
    service.syncData();
}, 1_800_000);

router.get('/', async (req, res,next) => {
    try {
        const data = await service.getData();
        if (data !== undefined) {
            res.status(200).json(data);
        }
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res,next) => {
    try {
        const { id } = req.params;
        const objsFinded = await service.getSome(Number(id));
        res.status(200).json(objsFinded);
    } catch (error) {
        next(error);
    }
});

export default router;