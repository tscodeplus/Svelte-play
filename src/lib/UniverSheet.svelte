<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { LocaleType } from '@univerjs/core';
	import { createUniver, merge } from '@univerjs/presets';
	import { UniverSheetsCorePreset } from '@univerjs/preset-sheets-core';
	import UniverPresetSheetsCoreZhCN from '@univerjs/preset-sheets-core/locales/zh-CN';
	import UniverPresetSheetsCoreEnUS from '@univerjs/preset-sheets-core/locales/en-US';

	// Import CSS styles
	import '@univerjs/preset-sheets-core/lib/index.css';

	// Props
	interface Props {
		data?: any;
		width?: string | number;
		height?: string | number;
		locale?: LocaleType;
		onReady?: (univerAPI: any) => void;
		onChange?: (data: any) => void;
		className?: string;
	}

	let {
		data,
		width = '100%',
		height = '400px',
		locale = LocaleType.ZH_CN,
		onReady,
		onChange,
		className = ''
	}: Props = $props();

	let containerRef = $state<HTMLDivElement>();
	let univerAPI = $state<any>(null);
	let workbook = $state<any>(null);

	onMount(() => {
		if (!containerRef) return;

		// Get locale data
		const localeData = locale === LocaleType.EN_US
			? UniverPresetSheetsCoreEnUS
			: UniverPresetSheetsCoreZhCN;

		// Initialize Univer using the new API
		const result = createUniver({
			locale,
			locales: {
				[locale]: merge({}, localeData),
			},
			presets: [
				UniverSheetsCorePreset({
					container: containerRef,
				}),
			],
		});

		univerAPI = result.univerAPI;

		// Create workbook with data
		if (data) {
			workbook = univerAPI.createWorkbook(data);
		} else {
			workbook = univerAPI.createWorkbook({});
		}

		// Call onReady callback
		if (onReady) {
			onReady(univerAPI);
		}

		// Set up change listener
		if (onChange) {
			// Note: The exact API for listening to changes may vary
			// This is a placeholder and may need adjustment based on actual API
			try {
				const subscription = univerAPI.onWorkbookChange?.((workbookData: any) => {
					onChange(workbookData);
				});
			} catch (error) {
				console.warn('Change listener setup failed:', error);
			}
		}
	});

	onDestroy(() => {
		if (univerAPI) {
			univerAPI.dispose();
		}
	});

	// Expose methods for external use
	export function getUniverAPI() {
		return univerAPI;
	}

	export function getWorkbook() {
		return workbook;
	}

	export function getData() {
		return workbook?.getSnapshot?.() || workbook;
	}

	export function setData(newData: any) {
		if (univerAPI && newData) {
			// This would need to be implemented based on Univer's API
			// for updating data after initialization
			console.warn('setData method needs to be implemented based on Univer API');
		}
	}
</script>

<div
	bind:this={containerRef}
	class="univer-container {className}"
	style="width: {typeof width === 'number' ? width + 'px' : width}; height: {typeof height === 'number' ? height + 'px' : height};"
></div>

<style>
	.univer-container {
		border: 1px solid #d9d9d9;
		border-radius: 4px;
	}

	:global(.univer-container .univer-workbench) {
		height: 100% !important;
	}
</style>