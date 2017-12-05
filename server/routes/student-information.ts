'use strict';
import { Router, Response, Request, NextFunction } from 'express';
import { FsService } from '../modules/fs.modules';
import { paths } from '../modules/paths';

const router: Router = Router();
const fs: FsService = FsService.instance;

router.get('/get/pull-down-menus', (req: Request, res: Response, next: NextFunction) => {
    console.log(`request[get]: pull down menus...`);
    fs.readFile(paths.setting)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(501).json(err));
});

router.post('/search', (req: Request, res: Response, next: NextFunction) => {
    // params には値が無いオブジェクトが渡されることもある
    // その場合は全顧客情報を返す
    console.log(`search student...`);
    const params = req.body;
    fs.readFile(paths.customers)
        .then((customers: any[]) => {
            const customResults = customers.map(obj => {
                return {
                    _id: obj._id,
                    _name: obj._name,
                    _gender: obj._gender,
                    _country: 'UTC+9 Japan',
                    _skype_name: obj._skype_name,
                    _email: obj._email
                };
            });
            res.status(200).json(customResults);
        })
        .catch(err => res.status(501).json(err));
});

module.exports = router;
