export enum eScreenOrientation {
    Landscape = 'landscape',
    Portrait = 'portrait'
}

export const devices = [
    'iPhone 4',
    'iPhone 5/SE',
    'iPhone 6/7/8',
    'iPhone 6/7/8 Plus',
    'iPhone X',
    'BlackBerry Z30',
    'Nexus 4',
    'Nexus 5',
    'Nexus 5X',
    'Nexus 6',
    'Nexus 6P',
    'Pixel 2',
    'Pixel 2 XL',
    'LG Optimus L70',
    'Nokia N9',
    'Nokia Lumia 520',
    'Microsoft Lumia 550',
    'Microsoft Lumia 950',
    'Galaxy S III',
    'Galaxy S5',
    'Kindle Fire HDX',
    'iPad Mini',
    'iPad',
    'iPad Pro',
    'Blackberry PlayBook',
    'Nexus 10',
    'Nexus 7',
    'Galaxy Note 3',
    'Galaxy Note II',
  ];
  
export default class Device {
    public readonly type = 'Device';
    constructor(public deviceName: string, public screenOrientation: eScreenOrientation) {}
}
