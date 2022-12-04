// VSCode Extension: Java Var Deletion

const vscode = require("vscode");

function activate(context) {
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

	// Listen for the onDidSaveTextDocument event
	vscode.workspace.onDidSaveTextDocument((document) => {
		// Check if the document being saved is a Java file
		if (document.languageId === "java") {
			// Apply the formatting edits to delete instances of "var"
			vscode.languages.getDocumentFormattingEdits(document).then((edits) => {
				vscode.workspace.applyEdit(edits);
			});
		}
	});
}

exports.activate = activate;
