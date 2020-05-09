import {performance} from 'perf_hooks';
import * as vscode from 'vscode';

export function activate() {

	const statusBar = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Left,
		10000
	);
	statusBar.show();

	async function showLatency() {
		let start = performance.now();
		await vscode.languages.getLanguages();
		let end = performance.now();
		let latency = end - start;
		statusBar.text = `Latency: ${latency.toFixed(2)}`;
		if (latency <= 500) {
			statusBar.color = `#7dd988`;
		}
		else if (latency <= 2500) {
			statusBar.color = '#ffb794';
		}
		else {
			statusBar.color = '#e64552';
		}
		setTimeout(showLatency, 1000);
	}

	showLatency();
}

export function deactivate() {}
