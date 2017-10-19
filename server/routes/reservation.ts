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

router.get('/register-of-booking/schedule', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    fs.readFile(paths.schedule)
        .then(result => res.status(200).json(result))
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

router.get('/search-booking/:parson', (req: Request, res: Response, next: NextFunction) => {
    console.info(`request: GET from search-booking`);
    const parsonName = req.params.parson;
    const queryObj = req.query;

    let responseData;

    // 条件によって検索対象テーブルが変わると思われるので、条件分岐を用意しておきます(2017/10/18)
    if (parsonName === 'customer') {
        // 顧客情報での検索
        responseData = [
            {
                customerId: 987123,
                reservationId: 'A0000001',
                studentName: 'TARO yamada',
                date: '2017-10-20 15:00:00',
                teacherName: 'Chris',
                reserveBy: 'student'
            },
            {
                customerId: 987123,
                reservationId: 'A0000002',
                studentName: 'TARO yamada',
                date: '2017-10-20 18:30:00',
                teacherName: 'Chris',
                reserveBy: 'student'
            },
            {
                customerId: 987123,
                reservationId: 'A0000005',
                studentName: 'TARO yamada',
                date: '2017-11-05 13:00:00',
                teacherName: 'Chris',
                reserveBy: 'student'
            },
            {
                customerId: 987123,
                reservationId: 'A0000003',
                studentName: 'TARO yamada',
                date: '2017-10-22 12:30:00',
                teacherName: 'Chris',
                reserveBy: 'student'
            },
            {
                customerId: 987123,
                reservationId: 'A0000004',
                studentName: 'TARO yamada',
                date: '2017-10-21 17:00:00',
                teacherName: 'Wenda',
                reserveBy: 'student'
            }
        ];
    } else {
        // 講師情報での検索
        responseData = [
            {
                customerId: 987123,
                reservationId: 'A0000001',
                studentName: 'TARO yamada',
                date: '2017-10-20 15:00:00',
                teacherName: 'Chris',
                reserveBy: 'student'
            },
            {
                customerId: 987123,
                reservationId: 'A0000002',
                studentName: 'TARO yamada',
                date: '2017-10-20 18:30:00',
                teacherName: 'Chris',
                reserveBy: 'student'
            },
            {
                customerId: 987126,
                reservationId: 'A0000009',
                studentName: 'JIRO gotou',
                date: '2017-10-20 19:00:00',
                teacherName: 'Chris',
                reserveBy: 'admin'
            },
            {
                customerId: 987126,
                reservationId: 'A0000016',
                studentName: 'TAKASHI saito',
                date: '2017-10-21 10:00:00',
                teacherName: 'Chris',
                reserveBy: 'student'
            },
            {
                customerId: 987124,
                reservationId: 'A0000012',
                studentName: 'RIE tanaka',
                date: '2017-10-22 11:00:00',
                teacherName: 'Chris',
                reserveBy: 'admin'
            }
        ]
    }

    res.status(200).json(responseData);
});

router.post('/search-booking/cancel', (req: Request, res: Response, next: NextFunction) => {
    /**
     * 予約のキャンセル処理（Cancellation of booking）
     * paramsにはテストデータに`classIssue`プロパティを追加したものが入る
     */
    const params = req.body;
    console.log(params);
    res.status(200).json('cancel post success.');
});

module.exports = router;
