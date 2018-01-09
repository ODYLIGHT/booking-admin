'use strict';
import { Router, Response, Request, NextFunction } from 'express';
import { FsService } from '../modules/fs.modules';
import * as Debug from 'debug';
import { paths, jsons } from '../modules/paths';
import { CustomerState } from '../../src/app/store/types';

const router: Router = Router();
const fs: FsService = FsService.instance;
const debug = Debug('debug:reservation');
const isDebug = debug.enabled;

router.get('/register-of-booking/search-customer', (req: Request, res: Response, next: NextFunction) => {
    // `register of booking`から生徒のIDで検索リクエスト
    // `id`,`name`,`time_zone`をリクエストします
    const customerId = +req.query.id;
    debug(`[ GET ] from search-customer with Id = ${customerId}`);
    if (isDebug) {
        fs.readFile(jsons.customers)
            .then((results: CustomerState[]) => {
                const dataAsRequestFormat = results.find(obj => obj.id === customerId);
                res.status(200).json(dataAsRequestFormat ? dataAsRequestFormat : undefined);
            })
            .catch(err => res.status(501).json(err));
    }
});

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

router.get('/check-teacher-schedule/init-teacher', (req: Request, res: Response, next: NextFunction) => {
    // Check Teacher schedule コンポーネントで、検索用教師情報を返す
    console.info(`request: GET from check-teacher-schedule init`);
    const dumy_teachersName = [
        {
            id: 1,
            name: 'Chris'
        },
        {
            id: 2,
            name: 'Aurora'
        },
        {
            id: 3,
            name: 'Pollard'
        },
        {
            id: 4,
            name: 'Hernandez'
        }, {
            id: 5,
            name: 'Young'
        }
    ];
    res.status(200).json(dumy_teachersName);
});

router.post('/check-teacher-schedule/search-schedule', (req: Request, res: Response, next: NextFunction) => {
    // １人の講師の一週間分のスケジュールを返す
    // スケジュール・予約状況
    const params = req.body; // {teacherId: number, year: number, month: number, day: number} monthは0~11
    const paramsTimeStamp = new Date(`${params.year}-${++params.month}-${params.day} 00:00:00`).getTime();
    const results = { schedules: [], reservations: [] };
    // console.log(params);
    fs.readFile(paths.schedule)
        .then((schedules: any[]) => {
            // 全てのスケジュールから検索日時の１週間分だけ抽出する
            const betweenOneWeekSchedule = schedules.filter(s => {
                const differenceTimeStamp = new Date(s._date).getTime() - paramsTimeStamp;
                return differenceTimeStamp >= 0 && differenceTimeStamp < 1000 * 60 * 60 * 24 * 7;
            });
            results.schedules = betweenOneWeekSchedule;

            fs.readFile(paths.reservation)
                .then((reservations: any[]) => {
                    // 全ての予約状況から検索講師分のみ取得
                    const selectTeacherReservations = reservations.filter(s => {
                        const differenceTimeStamp = new Date(s._reserve_date).getTime() - paramsTimeStamp;
                        const isWithinRangeDate = differenceTimeStamp >= 0 && differenceTimeStamp < 1000 * 60 * 60 * 24 * 7;
                        return isWithinRangeDate && s._teacher_id === parseInt(params.teacherId, 10);
                    });
                    results.reservations = selectTeacherReservations;
                    res.status(200).json(results);
                })
                .catch(err => res.status(501).json(err));
        })
        .catch(err => res.status(501).json(err));

});

module.exports = router;
