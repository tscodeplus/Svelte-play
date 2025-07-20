<script lang="ts">
	import { UniverSheet, createSampleData, createDefaultWorkbookData } from '$lib';
	import type { Univer } from '@univerjs/core';

	// 创建示例数据
	let sampleData = createSampleData();
	let basicData = createDefaultWorkbookData({
		id: 'basic-workbook',
		name: 'Basic Example'
	});

	// 当前选择的示例
	let currentExample = 'sample';

	// Univer 实例引用
	let univerRef: any;

	function handleUniverReady(univer: Univer) {
		console.log('Univer is ready:', univer);
	}

	function handleDataChange(data: any) {
		console.log('Data changed:', data);
	}

	function switchExample(example: string) {
		currentExample = example;
	}

	function exportData() {
		if (univerRef) {
			const data = univerRef.getData();
			console.log('Current data:', data);
			alert('数据已导出到控制台，请查看开发者工具');
		}
	}
</script>

<svelte:head>
	<title>Univer Sheet Svelte 5 集成示例</title>
	<meta name="description" content="展示如何在 Svelte 5 中集成 Univer Sheet" />
</svelte:head>

<div class="container mx-auto p-6">
	<h1 class="text-3xl font-bold mb-6">Univer Sheet Svelte 5 集成示例</h1>

	<div class="mb-6">
		<p class="text-gray-600 mb-4">
			这个示例展示了如何在 Svelte 5 项目中集成 Univer Sheet。您可以在其他页面中轻松导入和使用 UniverSheet 组件。
		</p>

		<div class="flex gap-4 mb-4">
			<button
				class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 {currentExample === 'sample' ? 'bg-blue-700' : ''}"
				onclick={() => switchExample('sample')}
			>
				示例数据
			</button>
			<button
				class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 {currentExample === 'basic' ? 'bg-green-700' : ''}"
				onclick={() => switchExample('basic')}
			>
				基础示例
			</button>
			<button
				class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
				onclick={exportData}
			>
				导出数据
			</button>
		</div>
	</div>

	<div class="border rounded-lg p-4 bg-white shadow-lg">
		<h2 class="text-xl font-semibold mb-4">
			{currentExample === 'sample' ? '示例数据表格' : '基础空白表格'}
		</h2>

		{#if currentExample === 'sample'}
			<UniverSheet
				bind:this={univerRef}
				data={sampleData}
				width="100%"
				height="500px"
				onReady={handleUniverReady}
				onChange={handleDataChange}
				className="border-2 border-gray-200"
			/>
		{:else}
			<UniverSheet
				bind:this={univerRef}
				data={basicData}
				width="100%"
				height="500px"
				onReady={handleUniverReady}
				onChange={handleDataChange}
				className="border-2 border-gray-200"
			/>
		{/if}
	</div>

	<div class="mt-8">
		<h2 class="text-2xl font-semibold mb-4">如何在其他页面使用</h2>
		<div class="bg-gray-100 p-4 rounded-lg">
			<h3 class="font-semibold mb-2">1. 导入组件和工具函数：</h3>
			<pre class="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto"><code>{`import { UniverSheet, createSampleData, createDefaultWorkbookData } from '$lib';`}</code></pre>

			<h3 class="font-semibold mb-2 mt-4">2. 在模板中使用：</h3>
			<pre class="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto"><code>{`<UniverSheet
  data={yourData}
  width="100%"
  height="400px"
  onReady={handleReady}
  onChange={handleChange}
/>`}</code></pre>

			<h3 class="font-semibold mb-2 mt-4">3. 创建数据：</h3>
			<pre class="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto"><code>{`// 使用示例数据
let data = createSampleData();

// 或创建空白工作簿
let data = createDefaultWorkbookData({
  id: 'my-workbook',
  name: 'My Workbook'
});`}</code></pre>
		</div>
	</div>

	<div class="mt-8">
		<h2 class="text-2xl font-semibold mb-4">功能特性</h2>
		<ul class="list-disc list-inside space-y-2 text-gray-700">
			<li>✅ 完整的电子表格功能（编辑、格式化、公式等）</li>
			<li>✅ 响应式设计，支持自定义宽度和高度</li>
			<li>✅ 数据变化监听和回调</li>
			<li>✅ TypeScript 类型支持</li>
			<li>✅ 易于集成到任何 Svelte 5 页面</li>
			<li>✅ 支持导入/导出数据</li>
			<li>✅ 丰富的工具函数库</li>
		</ul>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
	}
</style>