const vscode = require("vscode");

function activate(context) {
	// Replace the DocumentFormattingEditProvider class with the
	// registerDocumentFormattingEditProvider function
	let disposable = vscode.languages.registerDocumentFormattingEditProvider(
		"java",
		{
			provideDocumentFormattingEdits(document) {
				let edits = [];

				let regex = /\b(var)\b/g;
				let match;
				let lineNumber = 0;

				while ((match = regex.exec(document.getText()))) {
					lineNumber = document.positionAt(match.index).line;

					let startPos = new vscode.Position(lineNumber, match.index);
					let endPos = new vscode.Position(
						lineNumber,
						match.index + match[0].length
					);
					let range = new vscode.Range(startPos, endPos);
					edits.push(vscode.TextEdit.delete(range));
				}

				return edits;
			},
		}
	);

	context.subscriptions.push(disposable);

	// Apply the formatting edits to the document
	vscode.workspace.applyEdit((document) => {
		if (document.languageId === "java") {
			return vscode.languages.getDocumentFormattingEdits(document);
		}
	});
}

exports.activate = activate;
