'use strict';
import { Router, Response, Request, NextFunction } from 'express';
import { FsService } from '../modules/fs.modules';
import { paths } from '../modules/paths';

const router: Router = Router();
const fs: FsService = FsService.instance;

router.get('/register-of-booking/init', (req: Request, res: Response, next: NextFunction) => {
    console.info(`request: GET from register-booking init`);
    fs.readFile(paths.register_teachers)
        .then((result: any[]) => {
            const teachers = result.map(obj => {
                return { _id: obj._id, _name: obj._name };
            });
            res.status(200).json(teachers);
        })
        .catch(err => res.status(501).json(err));

});
router.get('/register-of-booking/search-customer/:id', (req: Request, res: Response, next: NextFunction) => {
    console.info(`request: GET from search-customer`);
    const customerId = +req.params.id;
    const tasks = [
        fs.readFile(paths.customers),
        fs.readFile(paths.register_teachers)
    ];
    Promise.all(tasks)
        .then((results: any[]) => {
            const targetCustomer = results[0].find(obj => obj._id === customerId);
            const teachers = results[1].map(obj => {
                return { _id: obj._id, _name: obj._name };
            });
            res.status(200).json({
                _name: targetCustomer._name,
                _teachers: teachers
            });
        })
        .catch(err => res.status(501).json(err));
});

module.exports = router;
