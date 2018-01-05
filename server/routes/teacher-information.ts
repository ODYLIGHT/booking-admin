'use strict';
import { Router, Response, Request, NextFunction } from 'express';
import { FsService } from '../modules/fs.modules';
import * as Debug from 'debug';
// jsonsに新しいテストデータを作っていきます（2017/12以降）
import { paths, jsons } from '../modules/paths';
import { TeacherState, ScheduleState } from '../../src/app/store/types';

const router: Router = Router();
const fs: FsService = FsService.instance;
const debug = Debug('debug:teacher-info');
const isDebug = debug.enabled;

// init - register-teachers
router.get('/register-teachers', (req: Request, res: Response, next: NextFunction) => {
    // このリクエストは、講師情報の`id`, `name`, `name_jp`, `state`を要求します
    debug(`[ GET ] from register-teachers`);
    if (isDebug) {
        fs.readFile(jsons.teachers)
            .then((result: TeacherState[]) => {
                const dataAsRequestFormat = result.map(item => {
                    const { id, name, name_jp, state } = item;
                    return { id, name, name_jp, state };
                });
                res.status(200).json(dataAsRequestFormat);
            })
            .catch(err => { res.status(501).json(err) });
    }
});

// delete - register-teachers delete button ckick.
router.delete('/register-teachers/delete/:id', (req: Request, res: Response, next: NextFunction) => {
    // このリクエストは、講師の削除をID指定で行います
    // 注意点として、該当講師に予約が入っている場合は削除を取り消すようにしてください
    // その場合のレスポンスの対応はまだ未定です
    debug(`[ DELETE ] from register-teachers. target Id = ${+req.params.id}`);
    const target_id = +req.params.id;

    if (isDebug) {
        // 70%で成功　30%でリクエストエラーを発生させる
        const randumNum = Math.random();
        if (randumNum <= 0.7) res.status(200).json({ isSuccess: true });
        else res.status(501).json({ isSuccess: false });
    }
});

// GET - teacher-forms when modify
router.get('/register-teachers/get/:id', (req: Request, res: Response, next: NextFunction) => {
    // このリクエストでは、講師情報の修正のためにIDから該当講師の全情報を取得します
    debug(`[ GET ] from teacher-froms with id`);
    const target_id = +req.params.id;

    if (isDebug) {
        fs.readFile(jsons.teachers)
            .then((result: TeacherState[]) => {
                const selectedTeacherState = result.filter(state => state.id === target_id);
                res.status(200).json(selectedTeacherState[0]);
            })
            .catch(err => res.status(501).json(err));
    }
});

// POST - teacher-forms add new teacher
router.post('/register-teachers/post', (req: Request, res: Response, next: NextFunction) => {
    debug('[ POST ] from teacher-froms for added new teacher');
    const params = req.body;
    // console.log(params);
    res.json({
        insert: true
    });
});

// PUT teacher-forms edit teacher
router.put('/register-teachers/put', (req: Request, res: Response, next: NextFunction) => {
    debug('[ PUT ] from teacher-froms for puted teacher');
    const params = req.body;
    // console.log(params);
    res.json({
        put: true
    });
});

// GET teachers information for schedules operations.
router.get('/teacher-schedule/operations-init', (req: Request, res: Response, next: NextFunction) => {
    // Teacher Scheduleコンポーネントのオペレーション部分で使う、講師とそのタイムゾーンを初期化処理時に返す
    // 要求するデータは`id`, `name`, `time_zone`です
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

router.get('/teacher-schedule/get-schedule', (req: Request, res: Response, next: NextFunction) => {
    // このリクエストは講師を選択した際、既に登録されているスケジュールを要求します
    const teacherId = +req.query.id;
    debug(`[ GET ] request schedule from teacher-schedule with id`);
    if (isDebug) {
        fs.readFile(jsons.schedules)
            .then((result: ScheduleState[]) => {
                const dataAsRequestFormat = result.filter(obj => obj.teacher_id === teacherId).map(item => item.schedule_date);
                res.status(200).json(dataAsRequestFormat);
            })
            .catch(err => res.status(501).json(err));
    }
});

// PUT teacher-schedule update
router.put('/teacher-schedule/update', (req: Request, res: Response, next: NextFunction) => {
    // このリクエストは、講師のIDと、新規登録用、更新用それぞれの日付文字列の配列を受け取ります
    // スケジュールの更新は、新しいスケジュールの追加と、既存のスケジュールの修正（削除）です
    // そのため、SQLクエリは`INSERT`と`DELETE`の２つを実行してください
    const params: { id: number, insert: string[], delete: string[] } = req.body;
    debug(`[ PUT ] from teacher-schedule. target id = ${params.id}`);
    if (isDebug) {
        // 70%で成功　30%でリクエストエラーを発生させる
        const randumNum = Math.random();
        if (randumNum <= 0.7) res.status(200).json({ isSuccess: true });
        else res.status(501).json({ isSuccess: false });
    }
});

module.exports = router;
