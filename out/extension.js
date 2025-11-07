"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// ===== 文件 1: src/extension.ts =====
const vscode = require("vscode");
// 默认的标点符号映射
const defaultPunctuationMap = {
    '，': ',',
    '。': '.',
    '：': ':',
    '；': ';',
    '！': '!',
    '？': '?',
    '【': '[',
    '】': ']',
    '（': '(',
    '）': ')',
    '《': '<',
    '》': '>',
    '\u201c': '"',
    '\u201d': '"',
    '\u2018': "'",
    '\u2019': "'",
    '、': ',',
    '·': '·',
    '—': '-',
    '…': '...',
};
let disposable;
function activate(context) {
    console.log('中文标点自动转换插件已激活');
    // 注册文本输入监听
    enableAutoConversion(context);
    // 注册命令：切换启用/禁用
    const toggleCommand = vscode.commands.registerCommand('punctuationConverter.toggle', () => {
        const config = vscode.workspace.getConfiguration('punctuationConverter');
        const enabled = config.get('enabled', true);
        config.update('enabled', !enabled, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(`标点转换已${!enabled ? '启用' : '禁用'}`);
    });
    context.subscriptions.push(toggleCommand);
}
exports.activate = activate;
function enableAutoConversion(context) {
    disposable = vscode.workspace.onDidChangeTextDocument((event) => {
        const config = vscode.workspace.getConfiguration('punctuationConverter');
        const enabled = config.get('enabled', true);
        if (!enabled) {
            return;
        }
        const editor = vscode.window.activeTextEditor;
        if (!editor || event.document !== editor.document) {
            return;
        }
        // 获取自定义映射
        const customMap = config.get('customMap', {});
        const punctuationMap = { ...defaultPunctuationMap, ...customMap };
        // 获取文件类型过滤
        const enabledLanguages = config.get('enabledLanguages', []);
        if (enabledLanguages.length > 0 && !enabledLanguages.includes(editor.document.languageId)) {
            return;
        }
        const change = event.contentChanges[0];
        if (!change || change.text.length !== 1) {
            return;
        }
        const inputChar = change.text;
        const replacement = punctuationMap[inputChar];
        if (replacement) {
            const position = change.range.start;
            editor.edit((editBuilder) => {
                const replaceRange = new vscode.Range(position, position.translate(0, 1));
                editBuilder.replace(replaceRange, replacement);
            }, {
                undoStopBefore: false,
                undoStopAfter: false
            });
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() {
    if (disposable) {
        disposable.dispose();
    }
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map