<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<nav class="bg-white shadow-sm border-b">
		<div class="container mx-auto px-6 py-4">
			<div class="flex items-center justify-between">
				<h1 class="text-xl font-bold text-gray-800">Univer Sheet Svelte 5</h1>
				<div class="flex space-x-4">
					<a
						href="/"
						class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
					>
						主页
					</a>
					<a
						href="/example"
						class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
					>
						使用示例
					</a>
				</div>
			</div>
		</div>
	</nav>

	<main>
		{@render children()}
	</main>
</div>
