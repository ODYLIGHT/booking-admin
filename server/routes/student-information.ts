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

router.post('/get/customer', (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    fs.readFile(paths.customers)
        .then((customers: any[]) => {
            const customer = customers.filter(obj => obj.id === id);
            res.status(200).json(customer);
        })
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
                    id: obj.id,
                    customerName: obj.customerName,
                    gender: obj.gender,
                    // country: 'UTC+9 Japan',
                    skypeName: obj.skypeName,
                    mailAddress: obj.mailAddress
                };
            });
            res.status(200).json(customResults);
        })
        .catch(err => res.status(501).json(err));
});

router.post('/insert', (req: Request, res: Response, next: NextFunction) => {
    const params = req.body;
    console.log(params);

    res.status(200).json(true);
});

router.put('/update', (req: Request, res: Response, next: NextFunction) => {
    const params = req.body;
    const id = req.body.id;
    console.log(params);

    res.status(200).json(true);
});

router.get('/credit/get', (req: Request, res: Response, next: NextFunction) => {
    console.log(`request [get] /creadit/get`);
    const params = req.query;

    Promise.all([ fs.readFile(paths.customers), fs.readFile(paths.credit) ])
        .then((results: any[]) => {
            const requestCustomer = results[0].filter(o => o.id === +params.id);
            const requestCredit = results[1].filter(o => o.customerId === +params.id);

            res.status(200).json({
                customer: requestCustomer[0],
                credits: requestCredit
            });
        })
        .catch(err => res.status(501).json(err));

});

module.exports = router;
