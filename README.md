# Chinese Punctuation Converter

自动将中文标点符号转换为对应的英文标点符号的 VS Code 插件。

## 功能特性

- ✨ 实时自动转换中文标点为英文标点
- 🎯 支持自定义标点映射
- 🔧 可针对特定编程语言启用
- 🎚️ 可随时启用/禁用转换功能

## 默认支持的标点转换

- `，` → `,`
- `。` → `.`
- `：` → `:`
- `；` → `;`
- `！` → `!`
- `？` → `?`
- `【` → `[`
- `】` → `]`
- `（` → `(`
- `）` → `)`
- `《` → `<`
- `》` → `>`
- `"` / `"` → `"`
- `'` / `'` → `'`
- `—` → `-`
- `…` → `...`

## 使用方法

安装插件后，直接输入中文标点即可自动转换。

### 自定义配置

在 VS Code 设置中搜索 `punctuationConverter`，可以配置：

#### 1. 启用/禁用
```json
{
    "punctuationConverter.enabled": true
}
```

#### 2. 自定义标点映射
```json
{
    "punctuationConverter.customMap": {
        "～": "~",
        "￥": "$"
    }
}
```

#### 3. 仅在特定语言中启用
```json
{
    "punctuationConverter.enabledLanguages": [
        "javascript",
        "typescript",
        "python",
        "markdown"
    ]
}
```

### 命令

- `切换中文标点转换` - 快速启用/禁用转换功能

## 开发和安装

1. 克隆或下载代码
2. 运行 `npm install`
3. 按 F5 启动调试
4. 或运行 `vsce package` 打包为 .vsix 文件安装

## License

MIT