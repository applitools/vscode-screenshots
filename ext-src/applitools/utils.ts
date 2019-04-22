import * as vscode from 'vscode';
import ScreenshotsService from '../services/ScreenshotsService';
import { eSizeMode } from '../../src/models/Browser';

export const getSettings = () => {
  const config = vscode.workspace.getConfiguration();
  return {
    applitoolsUnderTestUrl: config.get('applitoolsUnderTestUrl') as string,
    applitoolsAPIKey: config.get('applitoolsAPIKey') as string,
    applitoolsProxy: config.get('applitoolsProxy') as string,
    applitoolsServerUrl: config.get('applitoolsServerUrl') as string,
    applitoolsSizeMode: config.get('applitoolsSizeMode') as eSizeMode,
    applitoolsBrowsers: (config.get('applitoolsBrowsers') as any).browsers
  }
}

export const updateSettings = (settings: any) => {
  const config = vscode.workspace.getConfiguration();
  Object.keys(settings).forEach(key => {
    if (key === 'applitoolsBrowsers') {
      config.update(key, { browsers: settings[key] });
    } else {
      config.update(key, settings[key], true);
    }    
  });
}

export const runApplitoolsScreenshots = () => {
  const { applitoolsUnderTestUrl, applitoolsAPIKey, applitoolsProxy, applitoolsServerUrl, applitoolsSizeMode, applitoolsBrowsers } = getSettings();
  if (applitoolsUnderTestUrl && applitoolsAPIKey && applitoolsServerUrl && applitoolsSizeMode && applitoolsBrowsers) {
    const screenshotsService = new ScreenshotsService(applitoolsAPIKey, applitoolsBrowsers, applitoolsProxy ? applitoolsProxy : undefined, applitoolsServerUrl, applitoolsSizeMode, applitoolsUnderTestUrl);
    return screenshotsService.takeScreenshots();
  }
  return null;
} 
