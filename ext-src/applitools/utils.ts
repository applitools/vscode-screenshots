import * as vscode from 'vscode';
import ScreenshotsService from '../services/ScreenshotsService';
import Browser, { eSizeMode } from '../../src/models/Browser';
import { eErrors } from '../../src/modules/common/utils';
import { DEFAULT_SERVER_URL, DEFAULT_BROWSERS, DEFAULT_TARGET } from './consts';

export const getSettings = () => {
  const config = vscode.workspace.getConfiguration();
  return {
    applitoolsUnderTestUrl: config.get('applitoolsUnderTestUrl') as string,
    applitoolsAPIKey: config.get('applitoolsAPIKey') as string,
    applitoolsProxy: config.get('applitoolsProxy') as string,
    applitoolsServerUrl: config.get('applitoolsServerUrl') as string || DEFAULT_SERVER_URL,
    applitoolsTarget: config.get('applitoolsTarget') as eSizeMode || DEFAULT_TARGET,
    applitoolsBrowsers: config.get('applitoolsBrowsers') as Browser[] || DEFAULT_BROWSERS
  }
}

export const updateSettings = (settings: any) => {
  return new Promise((resolve)=> {
    const updates: Thenable<void>[] = [];
    const config = vscode.workspace.getConfiguration();
    Object.keys(settings).forEach(key => {
      updates.push(config.update(key, settings[key], true))    
    });
    Promise.all(updates).then(() => {
      resolve();
    });
  });
}

export const runApplitoolsScreenshots = () => {
  const { applitoolsUnderTestUrl, applitoolsAPIKey, applitoolsProxy, applitoolsServerUrl, applitoolsTarget, applitoolsBrowsers } = getSettings();
  if (!applitoolsAPIKey) {
    return Promise.resolve(eErrors.NoAPIKey);
  }
  if (applitoolsUnderTestUrl && applitoolsServerUrl && applitoolsTarget && applitoolsBrowsers) {
    const screenshotsService = new ScreenshotsService(applitoolsAPIKey, applitoolsBrowsers, applitoolsProxy ? applitoolsProxy : undefined, applitoolsServerUrl, applitoolsTarget, applitoolsUnderTestUrl);
    return screenshotsService.takeScreenshots();
  } else {
    return Promise.resolve(eErrors.MissingSettings);
  }
} 

export const getBrowserPath= () => {
  if (process.platform === 'win32') {
    return 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  } else {
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  }
}
