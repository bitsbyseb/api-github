import express from 'express';
import ReposService from '../services/repos.service';

const router = express.Router();
const service = new ReposService();

const interval = setInterval(() => {
    service.syncData();
}, 1_800_000);

router.get('/', (req, res) => {
    service.getData()
        .then(x => x !== undefined ? res.status(200).json(x) : '');
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