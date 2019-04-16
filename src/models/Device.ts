import { eBrowser } from './Browser';

export enum eScreenOrientation {
    Landscape = 'landscape',
    Portrait = 'portrait'
}

export enum eDeviceName {
    IPhoneX = 'iPhone X'
}

export default class Device {
    public readonly type = 'Device';
    constructor(public deviceName: eDeviceName, public screenOrientation: eScreenOrientation, name: eBrowser) {}
}
