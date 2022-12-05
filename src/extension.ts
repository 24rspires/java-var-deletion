import * as vscode from "vscode";

// Listen for events when a document is saved
vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
	// Check if the saved document is a Java file
	if (document.languageId === "java") {
		// Get an instance of the TextEditor for the document
		const editor = vscode.window.activeTextEditor;

		// Make sure the editor is defined before using it
		if (typeof editor !== "undefined") {
			// Use the TextEditor to search for and delete all "var" keywords in the document
			editor
				.edit((editBuilder) => {
					// Create a Position object for the start of the document using the constructor method
					const start = new vscode.Position(0, 0);

					// Create a Position object for the end of the document using the constructor method
					const end = new vscode.Position(
						document.lineCount - 1,
						document.lineAt(document.lineCount - 1).text.length
					);

					// Create a Range object that covers the entire document
					const range = new vscode.Range(start, end);

					// Use the Range object to specify the location of the text to be replaced
					editBuilder.replace(
						range,
						document.getText().replace(/\bvar\b /g, "")
					);
				})
				.then(() => {
					// Save the document after the edits have been made
					document.save();
				});
		}
	}
});
