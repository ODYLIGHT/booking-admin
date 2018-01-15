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

router.get('/search-booking/searching', (req: Request, res: Response, next: NextFunction) => {
    // customer_profile, teacher_profile, customer_reservationsが検索対象になります

    interface ParamsState {
        id?: number; // 顧客ID
        name?: string; // 顧客名
        mail_address?: string; // 顧客メールアドレス
        skype_name?: string; // 顧客スカイプ名
        reserved_date?: string; // 予約日（YYYY-MM-DD形式）
        teacherId?: number; // 講師ID
    }
    // teacherIdが入っている場合は、その講師の全予約情報を返すみたいです。

    const params: ParamsState = req.query;
    debug(`[ ${req.method} ]: ${req.url}`);
    if (isDebug) {
        const tasks = [
            fs.readFile(jsons.customers),
            fs.readFile(jsons.teachers),
            fs.readFile(jsons.reservations)
        ];
        Promise.all(tasks)
            .then((results: any[][]) => {
                // サーバーサイドで取得した３つのテーブル情報を一つにまとめます
                // この処理はフロント側で行うべきか要検討
                const customers = results[0].map((profile: CustomerState) => {
                    const { id, name, time_zone } = profile;
                    return { id, name, time_zone };
                }).reduce((o, c) => ({ ...o, [c.id]: c }), {});
                const teachers = results[1].map((profile: CustomerState) => {
                    const { id, name, time_zone } = profile;
                    return { id, name, time_zone };
                }).reduce((o, c) => ({ ...o, [c.id]: c }), {});

                let bookings: any[];

                if (!!params.teacherId) {
                    bookings = results[2].filter((reserved: ReservationState) => reserved.teacher_id === +params.teacherId)
                        .map((item: ReservationState) => {
                            return {
                                customer_id: item.customer_id,
                                reserved_id: item.id,
                                customer_name: customers[item.customer_id].name,
                                teacher_name: teachers[item.teacher_id].name,
                                reserved_date: item.reserved_date,
                                reserved_by: item.reserved_by
                            };
                        });
                } else {
                    if (!!!params.id) return res.status(501).json('開発用APIでは、顧客検索はIDのみです・・・');
                    bookings = results[2].filter((reserved: ReservationState) => reserved.customer_id === +params.id)
                        .map((item: ReservationState) => {
                            return {
                                customer_id: item.customer_id,
                                reserved_id: item.id,
                                customer_name: customers[item.customer_id].name,
                                teacher_name: teachers[item.teacher_id].name,
                                reserved_date: item.reserved_date,
                                reserved_by: item.reserved_by
                            }
                        });
                }
                res.status(200).json(bookings);
            })
            .catch(err => res.status(501).json(err));
    }
});

router.put('/search-booking/cancel', (req: Request, res: Response, next: NextFunction) => {
    const reservationId = req.body;
    debug(`[ ${req.method} ]: ${req.url}`);
    if (isDebug) {
        console.log(reservationId);
        // 70%で成功　30%でリクエストエラーを発生させる
        const randumNum = Math.random();
        if (randumNum <= 0.7) res.status(200).json({ isSuccess: true });
        else res.status(501).json({ isSuccess: false });
    }
});

////////////////////////////// ここまでが`search of booking`のAPI //////////////////////////////////////////

router.get('/check-teacher-schedule/get', (req: Request, res: Response, next: NextFunction) => {
    // 講師のIDと、スタート日付文字列を受け取ります
    // 一週間分のデータを返却してください (講師スケジュール、対象予約、予約者名)
    const params = {
        id: +req.query.id,
        date: req.query.date
    };
    debug(`[ ${req.method} ]: ${req.url}`);
    if (isDebug) {
        const tasks = [
            fs.readFile(jsons.schedules),
            fs.readFile(jsons.reservations)
        ];
        Promise.all(tasks)
            .then((results: any[][]) => {
                const schedules = results[0].filter(sdk => {
                    const intervalTime = new Date(sdk.schedule_date).getTime() - new Date(params.date).getTime();
                    return sdk.teacher_id === params.id && intervalTime > 0 && intervalTime < 604800 * 1000;
                });
                const reservations = results[1].filter((reserve: ReservationState) => {
                    const intervalTime = new Date(reserve.reserved_date).getTime() - new Date(params.date).getTime();
                    return reserve.teacher_id === params.id && intervalTime > 0 && intervalTime < 604800 * 1000;
                });
                res.status(200).json({ schedules, reservations });
            })
            .catch(err => res.status(501).json(err));
    }
});

//////////////////////////// ここまでが`check teacher schedule`のAPI ////////////////////////////////////////

module.exports = router;
