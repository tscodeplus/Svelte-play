# Univer Sheet Svelte 5 集成指南

本项目成功将 Univer Sheet 集成到 Svelte 5 中，提供了一个完整的电子表格解决方案。

## 🚀 功能特性

- ✅ 完整的电子表格功能（编辑、格式化、公式等）
- ✅ 响应式设计，支持自定义宽度和高度
- ✅ 数据变化监听和回调
- ✅ TypeScript 类型支持
- ✅ 易于集成到任何 Svelte 5 页面
- ✅ 支持导入/导出数据
- ✅ 丰富的工具函数库

## 📦 已安装的依赖

```json
{
  "@univerjs/core": "^0.9.3",
  "@univerjs/design": "^0.9.3",
  "@univerjs/docs": "^0.9.3",
  "@univerjs/docs-ui": "^0.9.3",
  "@univerjs/engine-formula": "^0.9.3",
  "@univerjs/engine-render": "^0.9.3",
  "@univerjs/preset-sheets-core": "^0.9.3",
  "@univerjs/presets": "^0.9.3",
  "@univerjs/sheets": "^0.9.3",
  "@univerjs/sheets-formula": "^0.9.3",
  "@univerjs/sheets-formula-ui": "^0.9.3",
  "@univerjs/sheets-numfmt": "^0.9.3",
  "@univerjs/sheets-numfmt-ui": "^0.9.3",
  "@univerjs/sheets-ui": "^0.9.3",
  "@univerjs/ui": "^0.9.3"
}
```

## 🛠️ 项目结构

```
src/lib/
├── UniverSheet.svelte          # 主要的 Univer Sheet 组件
├── univer-types.ts            # TypeScript 类型定义
├── univer-utils.ts            # 工具函数库
└── index.ts                   # 库导出文件

src/routes/
├── +page.svelte              # 主页示例
├── +layout.svelte            # 布局文件
└── example/
    └── +page.svelte          # 使用示例页面
```

## 🎯 快速开始

### 1. 导入组件

```typescript
import { UniverSheet, createSampleData, createDefaultWorkbookData } from '$lib';
```

### 2. 基本使用

```svelte
<script lang="ts">
  import { UniverSheet, createSampleData } from '$lib';
  
  let data = createSampleData();
  
  function handleReady(univer) {
    console.log('Univer is ready:', univer);
  }
  
  function handleChange(data) {
    console.log('Data changed:', data);
  }
</script>

<UniverSheet
  {data}
  width="100%"
  height="400px"
  onReady={handleReady}
  onChange={handleChange}
/>
```

### 3. 创建自定义数据

```typescript
// 创建空白工作簿
let data = createDefaultWorkbookData({
  id: 'my-workbook',
  name: 'My Workbook'
});

// 或使用示例数据
let data = createSampleData();

// 或从数组创建数据
const tableData = [
  ['Name', 'Age', 'City'],
  ['Alice', 25, 'New York'],
  ['Bob', 30, 'San Francisco']
];

const cellData = arrayToUniverData(tableData);
data.sheets['sheet-01'].cellData = cellData;
```

## 📋 组件 Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `data` | `UniverWorkbookData` | 默认工作簿 | 工作簿数据 |
| `width` | `string \| number` | `'100%'` | 组件宽度 |
| `height` | `string \| number` | `'400px'` | 组件高度 |
| `locale` | `LocaleType` | `LocaleType.ZH_CN` | 语言设置 |
| `theme` | `any` | `defaultTheme` | 主题配置 |
| `onReady` | `(univer: Univer) => void` | - | Univer 实例准备就绪回调 |
| `onChange` | `(data: any) => void` | - | 数据变化回调 |
| `className` | `string` | `''` | 自定义 CSS 类名 |

## 🔧 可用的工具函数

### 数据创建
- `createDefaultWorkbookData(options)` - 创建默认工作簿
- `createSampleData()` - 创建示例数据
- `arrayToUniverData(array)` - 将二维数组转换为 Univer 格式

### 数据操作
- `setCellValue(workbook, sheetId, row, col, value)` - 设置单元格值
- `getCellValue(workbook, sheetId, row, col)` - 获取单元格值
- `setBatchCellData(workbook, sheetId, data)` - 批量设置单元格数据
- `univerDataToArray(cellData)` - 将 Univer 数据转换为二维数组

## 🎨 样式自定义

CSS 样式已自动导入到 `src/app.css` 中：

```css
/* Univer CSS 样式导入 */
@import '@univerjs/design/lib/index.css';
@import '@univerjs/ui/lib/index.css';
@import '@univerjs/docs-ui/lib/index.css';
@import '@univerjs/sheets-ui/lib/index.css';
@import '@univerjs/sheets-formula-ui/lib/index.css';
@import '@univerjs/sheets-numfmt-ui/lib/index.css';
```

## 🚀 运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build
```

## 📖 示例页面

- **主页** (`/`) - 展示基本功能和示例数据
- **使用示例** (`/example`) - 展示如何在其他页面中使用组件

## 🔍 TypeScript 支持

项目提供了完整的 TypeScript 类型定义：

```typescript
import type { 
  UniverSheetProps, 
  UniverWorkbookData, 
  UniverSheetData,
  UniverCellData 
} from '$lib';
```

## 📝 注意事项

1. 确保所有 Univer 相关的 CSS 文件都已正确导入
2. 组件需要在客户端环境中运行，不支持 SSR
3. 数据变化监听需要根据具体的 Univer API 实现
4. 建议在生产环境中根据需要优化包大小

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个集成方案！
