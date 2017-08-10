'use strict';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

import { router } from './routes';

const app = express();
const PORT: number = process.env.PORT || 4400;
const HOST = 'localhost';

// スケジュールのUPDATE時、requestデータサイズがデフォルト値（'100kb'）を大幅に超えているので上限値変更
app.use(bodyParser.json({ limit: 10000000, extended: true }));

app.use('/api/config', router.config);
app.use('/api/teacher-information', router.teacher_info);
app.use('/api/reservation', router.reservation);

app.listen(PORT, HOST, () => {
    console.log(`express api server listening on ${PORT}`);
});
