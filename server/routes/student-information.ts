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
    // Request data: { id, name_first, name_last, gender, time_zone, skype_name, mail_address }
    const params = req.query;
    if (isDebug) {
        fs.readFile(jsons.customers)
            .then((customers: CustomerState[]) => {
                const allSelectedCustomers: StudentInformationState[] =
                    customers
                        .map(customer => {
                            const { id, name_first, name_last, gender, time_zone, skype_name, mail_address } = customer;
                            return { id, name_first, name_last, gender, time_zone, skype_name, mail_address };
                        })
                        .filter(customer => {
                            let bool = true;
                            if (!!Object.keys(params).length) {
                                Object.keys(params).forEach(key => {
                                    const regExp = new RegExp(params[key], 'ig');
                                    if (key === 'name') {
                                        if (!!!regExp.test(customer[`name_first`]) && !!!regExp.test(customer[`name_last`]))
                                            bool = false;
                                    } else {
                                        if (!!!regExp.test(customer[key])) bool = false;
                                    }
                                });
                            }
                            return bool;
                        });
                res.status(200).json(allSelectedCustomers);
            })
            .catch(err => res.status(501).json(err));
    }
});

router.get('/get-profile', (req: Request, res: Response, next: NextFunction) => {
    debug(`[ ${req.method} ]: ${req.url}`);
    const id = +req.query.id;
    // 顧客のIDから個人情報を取得します　単一オブジェクトを要求
    if (isDebug) {
        fs.readFile(jsons.customers)
            .then((response: CustomerState[]) => {
                const customer = response.find(value => value.id === id);
                res.status(200).json(customer);
            })
            .catch(err => res.status(501).json(err));
    }
});

router.post('/insert', (req: Request, res: Response, next: NextFunction) => {
    debug(`[ ${req.method} ]: ${req.url}`);
    const params: CustomerState = req.body;
    if (isDebug) {
        // 70%で成功　30%でリクエストエラーを発生させる
        const randumNum = Math.random();
        if (randumNum <= 0.7) res.status(200).json({ isSuccess: true, data: params });
        else res.status(501).json({ isSuccess: false });
    }
});

router.put('/update', (req: Request, res: Response, next: NextFunction) => {
    debug(`[ ${req.method} ]: ${req.url}`);
    const params: CustomerState = req.body;
    if (isDebug) {
        // 70%で成功　30%でリクエストエラーを発生させる
        const randumNum = Math.random();
        if (randumNum <= 0.7) res.status(200).json({ isSuccess: true, data: params });
        else res.status(501).json({ isSuccess: false });
    }
});

////////////////////////////////////////////////// これ以降は受講履歴 ////////////////////////////////////////////////////////
router.get('/lesson-history/get-init', (req: Request, res: Response, next: NextFunction) => {
    debug(`[ ${req.method} ]: ${req.url}`);
    const queryId = +req.query.id;
    if (isDebug) {
        // fs.readFile(jsons.customers)
        //     .then((response: CustomerState[]) => {
        //         const customer = response.find(value => value.id === id);
        //         res.status(200).json(customer);
        //     })
        //     .catch(err => res.status(501).json(err));
        const tasks = [
            fs.readFile(jsons.pull_downs),
            fs.readFile(jsons.customers),
            fs.readFile(jsons.reservations),
            fs.readFile(jsons.lesson_historys),
            fs.readFile(jsons.teachers)
        ];
        Promise.all(tasks)
            .then((results: any[]) => {
                const returnResults = {};
                const { french_levels, status, class_issue, task } = results[0];
                returnResults['pulldown_menus'] = { french_levels, status, class_issue, task };

                const { id, name_first, name_last, gender, time_zone, french_level, client_code } =
                    results[1].find(value => value.id === queryId);
                returnResults['customer'] = { id, name_first, name_last, gender, time_zone, french_level, client_code };

                const reservations: any[] = results[2].filter(item => item.customer_id === queryId);
                returnResults['reservations'] = reservations.map(o => {
                    return {
                        id: o.id,
                        name: results[4].find(v => v.id === o.teacher_id).name_first
                        + ' '
                        + results[4].find(v => v.id === o.teacher_id).name_last,
                        reserved_date: o.reserved_date
                    };
                }).sort((a, b) => {
                    return new Date(a.reserved_date).getTime() - new Date(b.reserved_date).getTime();
                });

                const reservedIds: string[] = reservations.map(item => item.id);
                const historys = results[3].filter(item => 0 <= reservedIds.findIndex(v => v === item.reserved_id));
                returnResults['historys'] = historys;

                res.status(200).json(returnResults);
            })
            .catch(err => res.status(501).json(err));
    }
});

router.put('/lesson-history/update-level', (req: Request, res: Response, next: NextFunction) => {
    // 顧客IDと新しい`franch_level`の値を受け取って更新します
    debug(`[ ${req.method} ]: ${req.url}`);
    const params = req.body;
    if (isDebug) {
        res.status(200).json(params);
    }
});

module.exports = router;
