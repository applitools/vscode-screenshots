import * as vscode from 'vscode';
import ApplitoolsWebViewPanel from './applitools/ApplitoolsWebViewPanel';
import { getSettings } from './applitools/utils';
import { eErrors } from '../src/modules/common/utils';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('applitools-webview.start', async () => {
		ApplitoolsWebViewPanel.createOrShow(context.extensionPath);	
		const settings = getSettings();
		if (!settings.applitoolsAPIKey && ApplitoolsWebViewPanel.currentPanel) {
			ApplitoolsWebViewPanel.currentPanel.sendError(eErrors.NoAPIKey);
		} else {
			if (ApplitoolsWebViewPanel.currentPanel) {
				ApplitoolsWebViewPanel.currentPanel.start();
			}
		}
	}));
}
