import * as vscode from 'vscode';
import ApplitoolsWebViewPanel from './applitools/ApplitoolsWebViewPanel';
import { runApplitoolsScreenshots, getSettings } from './applitools/utils';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('applitools-webview.start', async () => {
		ApplitoolsWebViewPanel.createOrShow(context.extensionPath);	

		const screenshots = await runApplitoolsScreenshots();
		if (screenshots && ApplitoolsWebViewPanel.currentPanel) {
			ApplitoolsWebViewPanel.currentPanel.sendScreenshots(screenshots, getSettings());
		} 
		if (screenshots === null && ApplitoolsWebViewPanel.currentPanel) {
			ApplitoolsWebViewPanel.currentPanel.sendError(`Couldn't retrieve screenshots. Please make sure you filled all the extension settings`);
		}					
	}));
}
