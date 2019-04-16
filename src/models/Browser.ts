export enum eBrowser {
    Chrome = 'chrome',
    Firefox = 'firefox',
    Opera = 'opera',
    IE10 = 'ie10',
    IE11 = 'ie11',
    Edge = 'edge'
}

export enum eSizeMode {
    Viewport = 'viewport',
    FullPage = 'full-page'
}

export default class Browser {
    public readonly type = 'Browser';
    constructor(public name: eBrowser, public width: number, public height: number) {
    }
}
