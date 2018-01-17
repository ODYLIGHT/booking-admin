'use strict';
import { Router, Response, Request, NextFunction } from 'express';
import { FsService } from '../modules/fs.modules';
import * as Debug from 'debug';
import { jsons } from '../modules/paths';

import { CustomerState, StudentInformationState } from '../../src/app/store/types';

const router: Router = Router();
const fs: FsService = FsService.instance;
const debug = Debug('debug:student-information');
const isDebug = debug.enabled;

router.get('/get', (req: Request, res: Response, next: NextFunction) => {
    debug(`[ ${req.method} ]: ${req.url}`);
    // paramsには顧客検索条件が入ります キーはすべてDBのカラム名と同じです
    // { id, name, mail_address, skype_name }
    // 未入力の条件に関してはフロント側で削除するよう制御してます(student-information.service)
    // paramsが空のオブジェクトになる場合は全顧客情報を要求します
    // Request data: { id, name, gender, time_zone, skype_name, mail_address }
    const params = req.query;
    if (isDebug) {
        fs.readFile(jsons.customers)
            .then((customers: CustomerState[]) => {
                const allSelectedCustomers: StudentInformationState[] =
                    customers
                        .map(customer => {
                            const { id, name, gender, time_zone, skype_name, mail_address } = customer;
                            return { id, name, gender, time_zone, skype_name, mail_address };
                        })
                        .filter(customer => {
                            let bool = true;
                            if (!!Object.keys(params).length) {
                                Object.keys(params).forEach(key => {
                                    const regExp = new RegExp(params[key], 'ig');
                                    if (!!!regExp.test(customer[key])) bool = false;
                                });
                            }
                            return bool;
                        });
                res.status(200).json(allSelectedCustomers);
            })
            .catch(err => res.status(501).json(err));
    }
});

module.exports = router;
