import Browser, { eSizeMode, browsers } from '../../src/models/Browser';

const DEFAULT_WIDTH_SIZE = 1024;
const DEFAULT_HEIGHT_SIZE = 768;
const DEFAULT_SERVER_URL = 'https://eyes.applitools.com';
const DEFAULT_TARGET = eSizeMode.Viewport;
const DEFAULT_BROWSERS = [
  new Browser(browsers[0], DEFAULT_WIDTH_SIZE, DEFAULT_HEIGHT_SIZE),
  new Browser(browsers[1], DEFAULT_WIDTH_SIZE, DEFAULT_HEIGHT_SIZE)
];

export { DEFAULT_SERVER_URL, DEFAULT_TARGET, DEFAULT_BROWSERS, DEFAULT_WIDTH_SIZE, DEFAULT_HEIGHT_SIZE };