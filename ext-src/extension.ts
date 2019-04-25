import * as vscode from 'vscode';
import ApplitoolsWebViewPanel from './applitools/ApplitoolsWebViewPanel';
import { runApplitoolsScreenshots, getSettings } from './applitools/utils';
import { eErrors } from '../src/modules/common/utils';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('applitools-webview.start', async () => {
		ApplitoolsWebViewPanel.createOrShow(context.extensionPath);	

		const screenshots = await runApplitoolsScreenshots();
		if (Array.isArray(screenshots) && ApplitoolsWebViewPanel.currentPanel) {
			ApplitoolsWebViewPanel.currentPanel.sendScreenshots(screenshots, getSettings());
		} 
		if (typeof screenshots === 'number' && ApplitoolsWebViewPanel.currentPanel) {
			ApplitoolsWebViewPanel.currentPanel.sendError(screenshots);
		}	
		if (!screenshots && ApplitoolsWebViewPanel.currentPanel) {
			ApplitoolsWebViewPanel.currentPanel.sendError(eErrors.FailedToTakeScreenshots);
		}				
	}));
}
