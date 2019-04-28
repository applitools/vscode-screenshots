import Browser from '../../models/Browser';
// import Device, { eScreenOrientation } from '../../models/Device';

export enum eErrors {
  NoAPIKey = 1,
  MissingSettings,
  FailedToTakeScreenshots
};

export const parseBrowsers = (
    browsers = ['Chrome'],
    viewports = ['1920x1080']
    // devices = [],
    // orientations = ['Portrait']
  ) => {
    const matrix: Browser[] = [];
    browsers.forEach(browser => {
      const name = browser.toLowerCase();
      viewports.forEach(viewport => {
        const { width, height } = parseViewport(viewport);
        matrix.push(new Browser(name, width, height));
      })
    });
    // devices.forEach(device => {
    //   orientations.forEach(orientation => {
    //     matrix.push(new Device(device, orientation.toLowerCase() as eScreenOrientation));
    //   })
    // })
    return matrix;
  }

  export const parseViewport = (vp: string) => {
    const [width, height] = vp.split('x').map(s => parseInt(s, 10));
    return { width, height };
  }
