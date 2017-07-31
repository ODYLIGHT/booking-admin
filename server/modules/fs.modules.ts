'use strict';
import * as fs from 'fs';

export class FsService {
    private static _instance: FsService;

    public static get instance(): FsService {
        if (!this._instance) this._instance = new FsService();
        return this._instance;
    }

    private constructor() { }

    public readFile(path: string): Promise<{}> {
        return new Promise((resolve, reject) => {
            try { resolve(JSON.parse(fs.readFileSync(path, 'utf8'))) }
            catch (e) { reject(e) }
        });
    }

}
