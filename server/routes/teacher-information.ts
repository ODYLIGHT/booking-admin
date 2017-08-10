'use strict';
import { Router, Response, Request, NextFunction } from 'express';
import { FsService } from '../modules/fs.modules';
import { paths } from '../modules/paths';

const router: Router = Router();
const fs: FsService = FsService.instance;

// develop時のデータ格納変数
let dataIfDevelop;

// init - register-teachers
router.get('/register-teachers', (req: Request, res: Response, next: NextFunction) => {
    console.info(`request: GET from register-teachers`);
    fs.readFile(paths.register_teachers)
        .then(result => {
            // develop
            dataIfDevelop = result;

            res.status(200).json(result);
        })
        .catch(err => { res.status(501).json(err) });
});

// delete - register-teachers delete button ckick.
router.delete('/register-teachers/delete/:id', (req: Request, res: Response, next: NextFunction) => {
    console.info(`request: DELETE from register-teachers`);
    const target_id = +req.params.id;

    // develop
    const filterAry = [];
    Object.keys(dataIfDevelop).forEach(key => {
        if (dataIfDevelop[key]['_id'] !== target_id) filterAry.push(dataIfDevelop[key]);
    });
    dataIfDevelop = filterAry;

    res.status(200).json(dataIfDevelop);
    // fs.readFile(paths.register_teachers)
    //     .then(result => {
    //         const filterAry = [];
    //         Object.keys(result).forEach(key => {
    //             if (result[key]['_id'] !== target_id) filterAry.push(result[key]);
    //         });
    //         res.status(200).json(filterAry);
    //     })
    //     .catch(err => { res.status(501).json(err) });
});

// GET - teacher-forms when modify
router.get('/register-teachers/get/:id', (req: Request, res: Response, next: NextFunction) => {
    console.info(`request: get from teacher-froms with id`);
    const target_id = +req.params.id;
    Object.keys(dataIfDevelop).forEach(key => {
        if (dataIfDevelop[key]['_id'] === target_id) res.json(dataIfDevelop[key]);
    });
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

// GET teacher-schedule init
router.get('/teacher-schedule', (req: Request, res: Response, next: NextFunction) => {
    console.info(`request: GET from teacher-schedule`);
    fs.readFile(paths.schedule)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => { res.status(501).json(err) });
});

// PUT teacher-schedule update
router.put('/teacher-schedule/update', (req: Request, res: Response, next: NextFunction) => {
    console.info(`request: PUT from teacher-schedule`);
    const params = req.body;
    // console.log(params);
    res.json({
        put: true
    });
});

module.exports = router;
