'use strict';
import { Router, Response, Request, NextFunction } from 'express';
import { FsService } from '../modules/fs.modules';
import { paths } from '../modules/paths';

const router: Router = Router();
const fs: FsService = FsService.instance;

router.get('/init', (req: Request, res: Response, next: NextFunction) => {
    console.info(`request: GET from /api/top/init`);
    fs.readFile(paths.menus)
        .then(result => { res.status(200).json(result) })
        .catch(err => { res.status(501).json(err) });
});

module.exports = router;
