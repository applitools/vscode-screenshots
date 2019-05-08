import * as puppeteer from 'puppeteer-core';
import Browser, { eSizeMode } from '../../src/models/Browser';
import Device from '../../src/models/Device';
import Snapshot from '../../src/models/Screenshot';
import { getBrowserPath } from '../applitools/utils';

const { getProcessPageAndSerializeScript } = require('@applitools/dom-snapshot');
const takeScreenshot = require('@applitools/visual-grid-client/src/sdk/takeScreenshot');

export default class ScreenshotsService {
    constructor(public apiKey: string, 
        public browsers: Array<Browser | Device>,
        public proxy: string | undefined, 
        public serverUrl: string, 
        public sizeMode: eSizeMode,
        public website: string) {}

    public async takeScreenshots(): Promise<Snapshot[]> {
        const renderInfo = await fetch(`${this.serverUrl}/api/sessions/renderInfo?apiKey=${this.apiKey}`)
            .then(r => r.json())
            .catch((err: any) => { 
                console.log(err);
                return err;
            });

        // error occurred
        if (renderInfo.message) {
            return Promise.resolve([]);
        }

        const browser = await puppeteer.launch({
            executablePath: getBrowserPath()
        }).catch((err: any) => { 
            console.log(err);
            return err;
        });

        // error occurred
        if (browser.message) {
            return Promise.resolve([]);
        }

        const page = await browser.newPage();
        const processPageAndSerialize = `(${await getProcessPageAndSerializeScript()})()`;
        
        await page.goto(this.website);

        const { cdt, url, resourceUrls, blobs, frames } = await page.evaluate(processPageAndSerialize);

        const imageLocations = await takeScreenshot({
            apiKey: this.apiKey,
            showLogs: false,
            proxy: this.proxy,
            serverUrl: this.serverUrl,
            renderInfo,
            cdt,
            url,
            resourceUrls,
            blobs,
            frames,
            browsers: this.browsers,
            sizeMode: this.sizeMode 
          }).catch((err: Error) => { 
              console.log(err);
              return Promise.resolve([]);
            });

          await browser.close();
          return imageLocations.map((location: string, index: number) => new Snapshot(this.browsers[index], location));
    }
}