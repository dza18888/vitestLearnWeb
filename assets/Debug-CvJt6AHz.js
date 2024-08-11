const e={title:"用例执行与调试",content:[{title:"配置文件",value:"config",content:[{type:"text",content:"Vitest的主要优势之一是它与Vite的统一配置。如果项目中使用了Vite构建，则vitest可以读取根目录的<code>vite.config.js</code>文件进行配置。如果你想在测试期间想要不同的配置，你可以单独创建<code>vitest.config.js</code>来进行配置。"},{type:"codeBlock",language:"javascript",content:`import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
  },
})`}]},{title:"配置选项",value:"configOptions",content:[{type:"text",content:'下列是可供选择的配置项，更多配置可参考官网：<a target="_blank" href="https://cn.vitest.dev/config/">Vitest配置选项</a>'}],children:[{title:"include",value:"config-include",content:[{type:"text",content:"匹配包含测试文件的 glob 规则。"},{type:"list",content:["类型：<code>string[]</code>","默认值: <code>['**/*.{test,spec}.?(c|m)[jt]s?(x)']</code>"]}]},{title:"exclude",value:"config-exclude",content:[{type:"text",content:"匹配排除测试文件的 glob 规则。"},{type:"list",content:["类型：<code>string[]</code>","默认值: <code>['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*']</code>"]}]},{title:"alias",value:"config-alias",content:[{type:"text",content:"在测试内部运行时定义自定义别名。它们将与来自<code>resolve.alias</code>的别名合并。"},{type:"list",content:["类型：<code>Record<string, string> | Array<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }></code>"]}]},{title:"globals",value:"config-globals",content:[{type:"text",content:"开启globals可全局提供vitest相关API"},{type:"list",content:["类型：<code>Boolean</code>","默认值：<code>false</code>","命令行终端：<code>--globals</code>，<code>--globals=false</code>"]},{type:"codeBlock",language:"javascript",content:`import { describe, test, vi, expect } from "vitest"; // 若globals未开启，则要按需引入api

describe("test", () => {
  test("test", () => {
    let func = vi.fn();
    func();
    expect(func).toHaveBeenCalled();
  });
});`}]},{title:"environment",value:"config-environment",content:[{type:"text",content:"Vitest 中的默认测试环境是一个 Node.js 环境。如果你正在构建 Web 端应用，需要使用 <code>jsdom</code> 或 <code>happy-dom</code> 这种类似浏览器(browser-like)的环境来替代 Node.js。"},{type:"list",content:["类型：<code>'node' | 'jsdom' | 'happy-dom' | 'edge-runtime' | string</code>","默认值：<code>'node'</code>"]},{type:"codeBlock",language:"javascript",content:`test('dom should be init successfully', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull()
})`}]},{title:"reporters",value:"config-reporters",content:[{type:"text",content:"用于输出的自定义覆盖率报告文件reporters。"},{type:"list",content:["类型：<code>Reporter | Reporter[]</code>","默认值：<code>'default'</code>","命令行终端：<code>--reporter=<name></code>，<code>--reporter=<name1> --reporter=<name2></code>"]},{type:"text",content:"其中可支持的reporters类型有："},{type:"list",content:["<code>'default'</code> - 默认值","<code>'junit'</code> - Junit XML 报告器","<code>'json'</code> - JSON格式报告总结","<code>'html'</code> - 根据@vitest/ui输出HTML报告"]}]},{title:"coverage",value:"config-coverage",content:[{type:"text",content:"在该项中配置覆盖率相关参数。"},{type:"list",content:["类型：<code>CoverageC8Options | CoverageIstanbulOptions</code>","默认值：<code>undefined</code>"]},{type:"text",content:"coverage.provider",style:"font-size:12px;font-weight:bold;margin-bottom:10px"},{type:"text",content:"使用 <code>provider</code> 选择收集测试覆盖率的工具。"},{type:"list",content:["类型：<code>'v8' | 'istanbul' | 'custom'</code>","默认值：<code>'v8'</code>"]},{type:"text",content:"coverage.include",style:"font-size:12px;font-weight:bold;margin-bottom:10px"},{type:"text",content:"匹配包含测试覆盖率的 glob 规则"},{type:"list",content:["类型：<code>string[]</code>","默认值：<code>['**']</code>","可用的测试提供者：<code>'v8' | 'istanbul'</code>"]},{type:"text",content:"coverage.exclude",style:"font-size:12px;font-weight:bold;margin-bottom:10px"},{type:"text",content:"使用全局模式排除在覆盖范围之外的文件列表。"},{type:"list",content:["类型：<code>string[]</code>","默认值："],style:"padding-bottom:0px"},{type:"codeBlock",language:"javascript",content:`[
  'coverage/**',
  'dist/**',
  '**/[.]**',
  'packages/*/test?(s)/**',
  '**/*.d.ts',
  '**/virtual:*',
  '**/__x00__*',
  '**/\0*',
  'cypress/**',
  'test?(s)/**',
  'test?(-*).?(c|m)[jt]s?(x)',
  '**/*{.,-}{test,spec}?(-d).?(c|m)[jt]s?(x)',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,ctsup,build}.config.*',
  '**/vitest.{workspace,projects}.[jt]s?(on)',
  '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
]`},{type:"list",content:["可用的测试提供者：<code>'v8' | 'istanbul'</code>"],style:"padding-top:0px"},{type:"text",content:"coverage.reporter",style:"font-size:12px;font-weight:bold;margin-bottom:10px"},{type:"text",content:'配置要使用的测试覆盖率报告器。查看 <a target="_blank"  href="https://istanbul.js.org/docs/advanced/alternative-reporters/">istanbul 文档</a> 来了解报告详情。'},{type:"list",content:["类型：<code>string[]</code>","默认值:<code> ['text', 'html', 'clover', 'json']</code>","可用的测试提供者：<code>'v8' | 'istanbul'</code>"]},{type:"text",content:"该报告器支持三种不同的类型:"},{type:"list",content:["单个报告器: <code>{ reporter: 'html' }</code>","无配置的多个报告器: <code> { reporter: ['html', 'json'] }</code>","有配置的单个或多个报告器："],style:"padding-bottom:0px"},{type:"codeBlock",language:"javascript",content:`{
  reporter: [
    ["lcov", { projectRoot: "./src" }],
    ["json", { file: "coverage.json" }],
    ["text"],
  ];
}`}]}]},{title:"执行用例",value:"executeUseCase",children:[{title:"命令行",value:"commandLine",content:[{type:"text",content:"在安装了 Vitest 的项目中，可以在 npm 脚本中使用 vitest 脚本，在package.json当中进行配置。"},{type:"codeBlock",language:"json",content:`{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}`},{type:"text",content:"<code>vitest</code>"},{type:"text",content:"在当前目录中启动 Vitest。在开发环境会自动进入监听(<code>watch</code>)模式。",style:"margin:10px 0"},{type:"text",content:"<code>vitest run</code>"},{type:"text",content:"在没有监听模式的情况下执行单次运行。",style:"margin:10px 0"},{type:"text",content:"<code>vitest watch</code>"},{type:"text",content:"运行所有测试套件，监听变化并在变化时重新运行测试。与没有参数的情况下调用 <code>vitest</code> 一样。",style:"margin:10px 0"}]}]},{title:"在Vscode中调试",value:"inVscode",children:[{title:"Vitest官方插件",value:"vitestExtension",content:[{type:"text",content:'Vitest官方Vscode扩展插件，支持快速执行单个用例，快速调测。插件地址：<a href="https://marketplace.visualstudio.com/items?itemName=vitest.explorer" target="_blank">Vitest扩展插件</a>'},{type:"list",content:["Visual Studio Code版本 >= <b>1.77.0</b> ( 2024/05/15 )","Vitest版本 >= <b>v1.4.0</b> ( 2024/05/15 )"]},{type:"img",content:"vitest-vscode-extension.png",style:"width: 50%"},{type:"img",content:"vscode-extension.gif",style:"width: 90vh"}]},{title:"Vscode终端调试",value:"terminalDebug",content:[{type:"text",content:"在 VSCode 中调试测试的快速方法是通过 <code>JavaScript 调试终端</code>。 打开一个新的 JavaScript 调试终端 并直接运行 <code>npm run test</code> 或 <code>vitest</code>。"},{type:"img",content:"js-debug-terminal.png",style:"width: 90vh"},{type:"text",content:"你还可以添加专用启动配置以在 VSCode 中调试测试文件:"},{type:"codeBlock",language:"json",content:`{
  // 想了解更多的信息, 请访问：https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "\${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "args": ["run", "\${relativeFile}"],
      "smartStep": true,
      "console": "integratedTerminal"
    }
  ]
}`},{type:"vscodeStep"}]}]}]};export{e as D};
