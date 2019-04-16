import Browser from './Browser';
import Device from './Device';

export default class Screenshot {
    constructor(public browser: Browser | Device, public screenshotUrl: string) {}
}