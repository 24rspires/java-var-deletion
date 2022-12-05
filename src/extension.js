"use strict";
exports.__esModule = true;
var vscode = require("vscode");
var saveCount = 0;
// Listen for events when a document is saved
vscode.workspace.onDidSaveTextDocument(function (savedDocument) {
    // Check if the saved document is a Java file
    if (savedDocument.languageId === "java") {
        // Get an instance of the TextEditor for the document
        var editor = vscode.window.activeTextEditor;
        // Make sure the editor is defined before using it
        if (typeof editor !== "undefined") {
            var range_1; // Define the range variable
            saveCount++;
            if (saveCount % 2 === 1) {
                // Use the TextEditor to search for and delete all "var" keywords in the document
                editor.edit(function (editBuilder) {
                    // Create a Position object for the start of the document using the constructor method
                    var start = new vscode.Position(0, 0);
                    // Create a Position object for the end of the document using the constructor method
                    var end = new vscode.Position(savedDocument.lineCount - 1, savedDocument.lineAt(savedDocument.lineCount - 1).text.length);
                    // Create a Range object that covers the entire document
                    range_1 = new vscode.Range(start, end); // Assign the Range object to the range variable
                    // Use the range variable to specify the location of the text to be replaced
                    editBuilder.replace(range_1, savedDocument.getText().replace(/\bvar\b /g, ""));
                });
                // Save the document
                editor.document.save();
            }
        }
    }
});
