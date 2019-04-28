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
    applitoolsSizeMode: config.get('applitoolsSizeMode') as eSizeMode || DEFAULT_TARGET,
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
  const { applitoolsUnderTestUrl, applitoolsAPIKey, applitoolsProxy, applitoolsServerUrl, applitoolsSizeMode, applitoolsBrowsers } = getSettings();
  if (!applitoolsAPIKey) {
    return Promise.resolve(eErrors.NoAPIKey);
  }
  if (applitoolsUnderTestUrl && applitoolsServerUrl && applitoolsSizeMode && applitoolsBrowsers) {
    const screenshotsService = new ScreenshotsService(applitoolsAPIKey, applitoolsBrowsers, applitoolsProxy ? applitoolsProxy : undefined, applitoolsServerUrl, applitoolsSizeMode, applitoolsUnderTestUrl);
    return screenshotsService.takeScreenshots();
  } else {
    return Promise.resolve(eErrors.MissingSettings);
  }
} 
