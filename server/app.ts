'use strict';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

const app = express();
const PORT: number = process.env.PORT || 4400;
const HOST = 'localhost';

app.use(bodyParser.json());

app.listen(PORT, HOST, () => {
    console.log(`express api server listening on ${PORT}`);
});
