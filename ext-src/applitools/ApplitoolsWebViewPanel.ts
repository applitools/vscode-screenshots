import * as path from 'path';
import * as vscode from 'vscode';
import Screenshot from '../../src/models/Screenshot';
import { eErrors } from '../../src/modules/common/utils';
import { updateSettings, getSettings, runApplitoolsScreenshots } from './utils';

export default class ApplitoolsWebViewPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: ApplitoolsWebViewPanel | undefined;

	private static readonly viewType = 'Applitools Snapshots';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionPath: string) {
		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		// If we already have a panel, show it. Otherwise, create a new panel.
		if (ApplitoolsWebViewPanel.currentPanel) {
			ApplitoolsWebViewPanel.currentPanel._panel.reveal(column);
		} else {
			ApplitoolsWebViewPanel.currentPanel = new ApplitoolsWebViewPanel(extensionPath, column || vscode.ViewColumn.One);
		}
	}

	private constructor(extensionPath: string, column: vscode.ViewColumn) {
		this._extensionPath = extensionPath;

		// Create and show a new webview panel
		this._panel = vscode.window.createWebviewPanel(ApplitoolsWebViewPanel.viewType, "Applitools Snapshots", column, {
			// Enable javascript in the webview
			enableScripts: true,
			retainContextWhenHidden: true,

			// And restrict the webview to only loading content from our extension's `media` directory.
			localResourceRoots: [
				vscode.Uri.file(path.join(this._extensionPath, 'build'))
			]
		});
		
		// Set the webview's initial html content 
		this._panel.webview.html = this._getHtmlForWebview();

		// Listen for when the panel is disposed.
		// This happens when the user closes the panel or when the panel is closed programmatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {			
				case 'settingsChanged': {		
					updateSettings(message.settings).then(() => {
						this._panel.webview.postMessage({ settings: getSettings(), error: undefined });
					});										
					break;
				}
				case 'takeScreenshot': {			
					if (message.settings) {
						updateSettings(message.settings).then(async () => {
							this._panel.webview.postMessage({ settings: getSettings(), error: undefined });
							this.takeScreenshots();
						});
					} else {
						this.takeScreenshots();
					}
					break;
				}
			}
		}, null, this._disposables);
	}

	public start() {
		// Send a error type to the webview.
		this._panel.webview.postMessage({ settings: getSettings() });
	}

	public sendScreenshots(screenshots: Screenshot[], settings: any) {
		// Send a message to the webview webview with snapshots.
		this._panel.webview.postMessage({ screenshots: screenshots, settings, error: undefined });
	}

	public sendError(errorType: eErrors) {
		// Send a error type to the webview.
		this._panel.webview.postMessage({ error: errorType });
	}

	public dispose() {
		ApplitoolsWebViewPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private async takeScreenshots() {
		const screenshots = await runApplitoolsScreenshots();
		if (Array.isArray(screenshots) && ApplitoolsWebViewPanel.currentPanel) {						
			this.sendScreenshots(screenshots, getSettings());
		} 
		if (typeof screenshots === 'number' && ApplitoolsWebViewPanel.currentPanel) {
			this.sendError(screenshots);
		}
		if (!screenshots && ApplitoolsWebViewPanel.currentPanel) {
			this.sendError(eErrors.FailedToTakeScreenshots);
		}
	}

	private _getHtmlForWebview() {
		const manifest = require(path.join(this._extensionPath, 'build', 'asset-manifest.json'));
		const mainScript = manifest['main.js'];
		const mainStyle = manifest['main.css'];

		const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainScript));
		const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
		const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainStyle));
		const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });

		// Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>Applitools Screenshots</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this view.</noscript>
				<div id="root"></div>
				
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}

function getNonce() {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}