'use strict';
import { Router, Response, Request, NextFunction } from 'express';
import { FsService } from '../modules/fs.modules';
import { paths } from '../modules/paths';

const router: Router = Router();
const fs: FsService = FsService.instance;

// develop時のデータ格納変数
let dataIfDevelop;

router.get('/register-teachers', (req: Request, res: Response, next: NextFunction) => {
    console.info(`request: GET from register-teachers`);
    fs.readFile(paths.register_teachers)
        .then(result => {
            // develop
            dataIfDevelop = result;

            res.status(200).json(result);
        })
        .catch(err => { res.status(501).json(err) });
});

router.delete('/register-teachers/delete/:id', (req: Request, res: Response, next: NextFunction) => {
    console.info(`request: DELETE from register-teachers`);
    const target_id = +req.params.id;

    // develop
    const filterAry = [];
    Object.keys(dataIfDevelop).forEach(key => {
        if (dataIfDevelop[key]['_id'] !== target_id) filterAry.push(dataIfDevelop[key]);
    });
    dataIfDevelop = filterAry;

    res.status(200).json(dataIfDevelop);
    // fs.readFile(paths.register_teachers)
    //     .then(result => {
    //         const filterAry = [];
    //         Object.keys(result).forEach(key => {
    //             if (result[key]['_id'] !== target_id) filterAry.push(result[key]);
    //         });
    //         res.status(200).json(filterAry);
    //     })
    //     .catch(err => { res.status(501).json(err) });
});

module.exports = router;
