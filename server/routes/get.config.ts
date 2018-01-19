'use strict';
import { Router, Response, Request, NextFunction } from 'express';
import { FsService } from '../modules/fs.modules';
import * as Debug from 'debug';
import { jsons } from '../modules/paths';

const router: Router = Router();
const fs: FsService = FsService.instance;
const debug = Debug('debug:get.config');
const isDebug = debug.enabled;

router.get('/menues', (req: Request, res: Response, next: NextFunction) => {
    debug(`[ ${req.method} ]: ${req.url}`);
    fs.readFile(jsons.menus)
        .then(result => res.status(200).json(result) )
        .catch(err => res.status(501).json(err) );
});

router.get('/pull-down', (req: Request, res: Response, next: NextFunction) => {
    debug(`[ ${req.method} ]: ${req.url}`);
    fs.readFile(jsons.pull_downs)
        .then((result: { [key: string]: any[] }) => {
            const { french_levels, purpose, languages, finded_tools, program_code, remark, client_code } = result;
            res.status(200).json({ french_levels, purpose, languages, finded_tools, program_code, remark, client_code })
        })
        .catch(err => res.status(501).json(err));
});

module.exports = router;
