'use strict';
import { Router, Response, Request, NextFunction } from 'express';
import { FsService } from '../modules/fs.modules';
import * as Debug from 'debug';
// jsonsに新しいテストデータを作っていきます（2017/12以降）
import { paths, jsons } from '../modules/paths';
import { TeacherState } from '../../src/app/store/types';

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
    // Object.keys(dataIfDevelop).forEach(key => {
    //     if (dataIfDevelop[key]['_id'] === target_id) res.json(dataIfDevelop[key]);
    // });
});

// POST - teacher-forms add new teacher
router.post('/register-teachers/post', (req: Request, res: Response, next: NextFunction) => {
    const params = req.body;
    // console.log(params);
    res.json({
        insert: true
    });
});

// PUT teacher-forms edit teacher
router.put('/register-teachers/put', (req: Request, res: Response, next: NextFunction) => {
    const params = req.body;
    // console.log(params);
    res.json({
        put: true
    });
});

// Teacher Scheduleコンポーネントのオペレーション部分で使う、講師とそのタイムゾーンを初期化処理時に返す
router.get('/teacher-schedule/operations-init', (req: Request, res: Response, next: NextFunction) => {
    debug(`[ ${req.method} ]: ${req.url}`);
    fs.readFile(jsons.teachers)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(501).json(err));
    // fs.readFile(paths.schedule)
    //     .then(result => {
    //         res.status(200).json(result);
    //     })
    //     .catch(err => { res.status(501).json(err) });
});

// PUT teacher-schedule update
router.put('/teacher-schedule/update', (req: Request, res: Response, next: NextFunction) => {
    debug(`[ PUT ] from teacher-schedule`);
    const params = req.body;
    // console.log(params);
    res.json({
        put: true
    });
});

module.exports = router;
