<script lang="ts">
	import { UniverSheet, arrayToUniverData, createDefaultWorkbookData, setCellValue } from '$lib';

	// 创建自定义数据
	let customData = createDefaultWorkbookData({
		id: 'custom-workbook',
		name: 'Custom Data Example'
	});

	// 添加一些自定义数据
	const tableData = [
		['产品名称', '价格', '库存', '销量'],
		['iPhone 15', 999, 50, 120],
		['Samsung Galaxy', 899, 30, 85],
		['Google Pixel', 799, 25, 60],
		['OnePlus 12', 699, 40, 75]
	];

	// 将数组数据转换为Univer格式
	const cellData = arrayToUniverData(tableData);
	customData.sheets['sheet-01'].cellData = cellData;

	let univerInstance: any = null;

	function handleReady(univerAPI: any) {
		univerInstance = univerAPI;
		console.log('Univer实例已准备就绪');
	}

	function handleChange(data: any) {
		console.log('数据已更改:', data);
	}

	function addNewRow() {
		if (!univerInstance) return;
		
		// 这里可以添加新行的逻辑
		// 注意：实际实现需要根据Univer的API来操作
		alert('添加新行功能需要根据Univer API实现');
	}

	function clearData() {
		// 重新创建空白数据
		customData = createDefaultWorkbookData({
			id: 'custom-workbook-cleared',
			name: 'Cleared Workbook'
		});
	}
</script>

<svelte:head>
	<title>Univer Sheet 使用示例</title>
</svelte:head>

<div class="container mx-auto p-6">
	<div class="mb-6">
		<a href="/" class="text-blue-500 hover:text-blue-700">← 返回主页</a>
	</div>

	<h1 class="text-3xl font-bold mb-6">其他页面中使用 Univer Sheet</h1>

	<div class="mb-6">
		<p class="text-gray-600 mb-4">
			这个页面展示了如何在项目的其他页面中导入和使用 UniverSheet 组件。
		</p>

		<div class="flex gap-4 mb-4">
			<button
				class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				onclick={addNewRow}
			>
				添加新行
			</button>
			<button
				class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
				onclick={clearData}
			>
				清空数据
			</button>
		</div>
	</div>

	<div class="border rounded-lg p-4 bg-white shadow-lg">
		<h2 class="text-xl font-semibold mb-4">产品库存管理表</h2>

		<UniverSheet
			data={customData}
			width="100%"
			height="400px"
			onReady={handleReady}
			onChange={handleChange}
			className="border border-gray-300"
		/>
	</div>

	<div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
		<div class="bg-blue-50 p-4 rounded-lg">
			<h3 class="font-semibold text-blue-800 mb-2">导入方式</h3>
			<pre class="text-sm bg-white p-2 rounded border"><code>{`import { UniverSheet } from '$lib';`}</code></pre>
		</div>

		<div class="bg-green-50 p-4 rounded-lg">
			<h3 class="font-semibold text-green-800 mb-2">基本用法</h3>
			<pre class="text-sm bg-white p-2 rounded border"><code>{`<UniverSheet
  data={yourData}
  width="100%"
  height="400px"
/>`}</code></pre>
		</div>

		<div class="bg-purple-50 p-4 rounded-lg">
			<h3 class="font-semibold text-purple-800 mb-2">事件处理</h3>
			<pre class="text-sm bg-white p-2 rounded border"><code>{`<UniverSheet
  onReady={handleReady}
  onChange={handleChange}
/>`}</code></pre>
		</div>

		<div class="bg-orange-50 p-4 rounded-lg">
			<h3 class="font-semibold text-orange-800 mb-2">自定义样式</h3>
			<pre class="text-sm bg-white p-2 rounded border"><code>{`<UniverSheet
  className="custom-style"
  width="800px"
  height="500px"
/>`}</code></pre>
		</div>
	</div>

	<div class="mt-8">
		<h2 class="text-2xl font-semibold mb-4">可用的工具函数</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="bg-gray-50 p-4 rounded-lg">
				<h4 class="font-semibold mb-2">数据创建</h4>
				<ul class="text-sm space-y-1">
					<li>• <code>createDefaultWorkbookData()</code></li>
					<li>• <code>createSampleData()</code></li>
					<li>• <code>arrayToUniverData()</code></li>
				</ul>
			</div>
			<div class="bg-gray-50 p-4 rounded-lg">
				<h4 class="font-semibold mb-2">数据操作</h4>
				<ul class="text-sm space-y-1">
					<li>• <code>setCellValue()</code></li>
					<li>• <code>getCellValue()</code></li>
					<li>• <code>setBatchCellData()</code></li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
	}
</style>
