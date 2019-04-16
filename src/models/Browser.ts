export const browsers = ['Chrome', 'Firefox']

export const viewportSizes = [
  '2560x1440',
  '2048x1536',
  '1920x1080',
  '750x1334',
  '720x1280',
];

export enum eSizeMode {
    Viewport = 'viewport',
    FullPage = 'full-page'
}

export default class Browser {
    public readonly type = 'Browser';
    constructor(public name: string, public width: number, public height: number) {
    }
}
