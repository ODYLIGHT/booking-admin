'use strict';
import { Router, Response, Request, NextFunction } from 'express';
import { FsService } from '../modules/fs.modules';
import * as Debug from 'debug';
import { paths, jsons } from '../modules/paths';
import { CustomerState, TeacherState, ScheduleState, ReservationState } from '../../src/app/store/types';

const router: Router = Router();
const fs: FsService = FsService.instance;
const debug = Debug('debug:reservation');
const isDebug = debug.enabled;

router.get('/get-teacher', (req: Request, res: Response, next: NextFunction) => {
    // Teacher Scheduleコンポーネントのオペレーション部分で使う、講師とそのタイムゾーンを初期化処理時に返す
    // 要求するデータは`id`, `name`, `time_zone`です
    // 複数個所で使うためURLに個別コンポーネント名は含めていません
    debug(`[ ${req.method} ]: ${req.url}`);

    if (isDebug) {
        fs.readFile(jsons.teachers)
            .then((result: TeacherState[]) => {
                const dataAsRequestFormat = result.map(item => {
                    const { id, name, time_zone } = item;
                    return { id, name, time_zone };
                });
                res.status(200).json(dataAsRequestFormat);
            })
            .catch(err => res.status(501).json(err));
    }
});

router.get('/register-of-booking/search-booking', (req: Request, res: Response, next: NextFunction) => {
    const customerId = +req.query.customerId;
    const teacherId = +req.query.teacherId;
    debug(`[ ${req.method} ]: ${req.url}`);
    if (isDebug) {
        fs.readFile(jsons.customers)
            .then((results: CustomerState[]) => {
                const requestCustomer = results.find(obj => obj.id === customerId);
                if (!!!requestCustomer) res.status(200).json(undefined);
                else {
                    // 検索した生徒がいれば講師のスケジュールと、予約状況を取得して返す
                    fs.readFile(jsons.schedules)
                        .then((schedules: ScheduleState[]) => {
                            const _schedules: Date[] = schedules.filter(obj => {
                                return obj.teacher_id === teacherId;
                            }).map(item => item.schedule_date);

                            fs.readFile(jsons.reservations)
                                .then((reservations: ReservationState[]) => {
                                    // その講師の全ての予約（顧客関係なく）
                                    const _reservations: ReservationState[] = reservations.filter(obj => obj.teacher_id === teacherId);
                                    res.status(200).json({
                                        customer: requestCustomer,
                                        schedules: _schedules,
                                        reservations: _reservations
                                    });
                                })
                                .catch(err => res.status(501).json(err));

                        })
                        .catch(err => res.status(501).json(err));
                }
            })
            .catch(err => res.status(501).json(err));
    }
});

router.put('/register-of-booking/update', (req: Request, res: Response, next: NextFunction) => {
    // このリクエストは、講師・生徒のIDと、新規登録用、更新用それぞれの日付文字列の配列を受け取ります
    // 動作は`teacher schedule`のUpdateと同じですが、paramsのIDが生徒と講師両方あります
    // スケジュールの更新は、新しいスケジュールの追加と、既存のスケジュールの修正（削除）です
    // そのため、SQLクエリは`INSERT`と`DELETE`の２つを実行してください
    const params: { customerId: number, teacherId: number, insert: string[], delete: string[] } = req.body;
    debug(`[ ${req.method} ]: ${req.url}`);
    if (isDebug) {
        // 70%で成功　30%でリクエストエラーを発生させる
        const randumNum = Math.random();
        if (randumNum <= 0.7) res.status(200).json({ isSuccess: true });
        else res.status(501).json({ isSuccess: false });
    }
});

//////////////////////////// ここまでが`register of booking`のAPI ////////////////////////////////////////

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
