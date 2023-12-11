import express from 'express';
import userService from '../services/user.service';

const router = express.Router();
const service = new userService();

// const interval = setInterval(()=> {
//     service.syncData();
// },1_800_000);

const interval = setInterval(()=> {
    service.syncData();
},20_000);

router.get('/', (req, res) => {
    service.getData()
        .then(x => x !== undefined ? res.status(200).json(x) : '');
});

export default router;