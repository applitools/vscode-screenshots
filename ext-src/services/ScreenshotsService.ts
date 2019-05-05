import * as puppeteer from 'puppeteer';
import Browser, { eSizeMode } from '../../src/models/Browser';
import Device from '../../src/models/Device';
import Snapshot from '../../src/models/Screenshot';

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
            .catch(err => err);

        // error occurred
        if (renderInfo.message) {
            return Promise.resolve([]);
        }

        const browser = await puppeteer.launch();
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
              return null;
            });

          await browser.close();
          return imageLocations.map((location: string, index: number) => new Snapshot(this.browsers[index], location));
    }
}