'use strict';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

import { router } from './routes';

const app = express();
const PORT: number = process.env.PORT || 4400;
const HOST = 'localhost';

app.use(bodyParser.json());

app.use('/api/config', router.config);

app.listen(PORT, HOST, () => {
    console.log(`express api server listening on ${PORT}`);
});
