'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let _snippets: { [modeId: string]: vscode.CompletionItem[] } = Object.create(null);
let _registeredProviders: { [modeId: string]: vscode.Disposable } = Object.create(null);

class CompletionProvider implements vscode.CompletionItemProvider {
    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        vscode.CompletionItem[] | Thenable<vscode.CompletionItem[]> | vscode.CompletionList | Thenable<vscode.CompletionList> {
        return _snippets[document.languageId];
    }

    public resolveCompletionItem(item: vscode.CompletionItem, token: vscode.CancellationToken):
        vscode.CompletionItem | Thenable<vscode.CompletionItem> {
        return item;
    }
}

function parseSnippetFile(snippetFileContent: string, filePath: string): vscode.CompletionItem[] {
    try {
        let snippetsObj = JSON.parse(snippetFileContent);

        if (!snippetsObj || typeof snippetsObj !== 'object') {
            return [];
        }
        let topLevelProperties = Object.keys(snippetsObj);
        let result: vscode.CompletionItem[] = []

        let processSnippet = (snippet: any, name: string) => {
            let prefix = snippet['prefix'];
            let bodyStringOrArray = snippet['body'];

            if (Array.isArray(bodyStringOrArray)) {
                bodyStringOrArray = bodyStringOrArray.join('\n');
            }

            if (typeof prefix === 'string' && typeof bodyStringOrArray === 'string') {
                let newSnippet = new vscode.CompletionItem(prefix);
                newSnippet.kind = vscode.CompletionItemKind.Snippet;
                newSnippet.detail = snippet['description'] || name,
                    newSnippet.documentation = snippet['description'] || name,
                    newSnippet.insertText = new vscode.SnippetString(bodyStringOrArray);
                result.push(newSnippet);
            }
        }

        topLevelProperties.forEach(topLevelProperty => {
            let scopeOrTemplate = snippetsObj[topLevelProperty];
            if (scopeOrTemplate['body'] && scopeOrTemplate['prefix']) {
                processSnippet(scopeOrTemplate, topLevelProperty);
            } else {
                let snippetNames = Object.keys(scopeOrTemplate);
                snippetNames.forEach(name => {
                    processSnippet(scopeOrTemplate[name], name);
                });
            }
        });

        return result;
    } catch (err) {
        vscode.window.showErrorMessage(`Project snippets: parseSnippetFile ${filePath} error: ${err}`);

        return [];
    }
}

async function readAndRegisterSnippets(filePath: vscode.Uri): Promise<vscode.CompletionItem[]> {
    return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
        fs.readFile(filePath.fsPath, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                reject(err);
            }

            let snippets = parseSnippetFile(data.toString(), filePath.path);
            resolve(snippets);
        });
    });
}

export async function activate(context: vscode.ExtensionContext) {
    let completionItemProvider = new CompletionProvider();

    let snippetFiles = await vscode.workspace.findFiles(".vscode/snippets/*.json", "");
    if (snippetFiles) {
        for (let i = 0; i < snippetFiles.length; i++) {
            let modeId = path.basename(snippetFiles[i].path).split('\.')[0];
            let snippets = await readAndRegisterSnippets(snippetFiles[i]);
            _snippets[modeId] = snippets;
        }

        for (const modeId in _snippets) {
            let disposable = vscode.languages.registerCompletionItemProvider(modeId, completionItemProvider);
            _registeredProviders[modeId] = disposable;
        }
    }

    let snippetFilesWatcher = vscode.workspace.createFileSystemWatcher("**/.vscode/snippets/*.json");
    let snippetUpdate = async (e: vscode.Uri) => {
        let modeId = path.basename(e.path).split('\.')[0];
        let snippets = await readAndRegisterSnippets(e);
        _snippets[modeId] = snippets;

        if (_registeredProviders[modeId]) {
            _registeredProviders[modeId].dispose();
        }

        let disposable = vscode.languages.registerCompletionItemProvider(modeId, completionItemProvider);
        _registeredProviders[modeId] = disposable;
    };

    snippetFilesWatcher.onDidCreate(snippetUpdate);
    snippetFilesWatcher.onDidChange(snippetUpdate);
    snippetFilesWatcher.onDidDelete(async (e) => {
        let modeId = path.basename(e.path).split('\.')[0];

        if (_registeredProviders[modeId]) {
            _registeredProviders[modeId].dispose();
        }
    });
}

export function deactivate() {
    for (let modeId in _registeredProviders) {
        _registeredProviders[modeId].dispose()
    }
}