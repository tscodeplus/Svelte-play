<script lang="ts">
  import { browser } from '$app/environment';

  let containerRef = $state<HTMLDivElement>();
  let univerAPI = $state<any>(null);

  $effect(() => {
    if (!browser || !containerRef) return;

    let cleanup: (() => void) | undefined;

    async function initUniver() {
      try {
        // Dynamic imports to ensure these only run in the browser
        const { LocaleType, merge, Univer, UniverInstanceType } = await import('@univerjs/core');
        const { FUniver } = await import('@univerjs/core/facade');
        const DesignZhCN = (await import('@univerjs/design/locale/zh-CN')).default;
        const { UniverDocsPlugin } = await import('@univerjs/docs');
        const { UniverDocsUIPlugin } = await import('@univerjs/docs-ui');
        const DocsUIZhCN = (await import('@univerjs/docs-ui/locale/zh-CN')).default;
        const { UniverFormulaEnginePlugin } = await import('@univerjs/engine-formula');
        const { UniverRenderEnginePlugin } = await import('@univerjs/engine-render');
        const { UniverSheetsPlugin } = await import('@univerjs/sheets');
        const { UniverSheetsFormulaPlugin } = await import('@univerjs/sheets-formula');
        const { UniverSheetsFormulaUIPlugin } = await import('@univerjs/sheets-formula-ui');
        const SheetsFormulaUIZhCN = (await import('@univerjs/sheets-formula-ui/locale/zh-CN')).default;
        const { UniverSheetsNumfmtPlugin } = await import('@univerjs/sheets-numfmt');
        const { UniverSheetsNumfmtUIPlugin } = await import('@univerjs/sheets-numfmt-ui');
        const SheetsNumfmtUIZhCN = (await import('@univerjs/sheets-numfmt-ui/locale/zh-CN')).default;
        const { UniverSheetsUIPlugin } = await import('@univerjs/sheets-ui');
        const SheetsUIZhCN = (await import('@univerjs/sheets-ui/locale/zh-CN')).default;
        const SheetsZhCN = (await import('@univerjs/sheets/locale/zh-CN')).default;
        const { UniverUIPlugin } = await import('@univerjs/ui');
        const UIZhCN = (await import('@univerjs/ui/locale/zh-CN')).default;

        // Import CSS files
        await import('@univerjs/design/lib/index.css');
        await import('@univerjs/ui/lib/index.css');
        await import('@univerjs/docs-ui/lib/index.css');
        await import('@univerjs/sheets-ui/lib/index.css');
        await import('@univerjs/sheets-formula-ui/lib/index.css');
        await import('@univerjs/sheets-numfmt-ui/lib/index.css');

        // Import facade APIs
        await import('@univerjs/engine-formula/facade');
        await import('@univerjs/ui/facade');
        await import('@univerjs/docs-ui/facade');
        await import('@univerjs/sheets/facade');
        await import('@univerjs/sheets-ui/facade');
        await import('@univerjs/sheets-formula/facade');
        await import('@univerjs/sheets-numfmt/facade');

        const univer = new Univer({
          locale: LocaleType.ZH_CN,
          locales: {
            [LocaleType.ZH_CN]: merge(
              {},
              DesignZhCN,
              UIZhCN,
              DocsUIZhCN,
              SheetsZhCN,
              SheetsUIZhCN,
              SheetsFormulaUIZhCN,
              SheetsNumfmtUIZhCN,
            ),
          },
        });

        univer.registerPlugin(UniverRenderEnginePlugin);
        univer.registerPlugin(UniverFormulaEnginePlugin);
        univer.registerPlugin(UniverUIPlugin, {
          container: containerRef,
        });
        univer.registerPlugin(UniverDocsPlugin);
        univer.registerPlugin(UniverDocsUIPlugin);
        univer.registerPlugin(UniverSheetsPlugin);
        univer.registerPlugin(UniverSheetsUIPlugin);
        univer.registerPlugin(UniverSheetsFormulaPlugin);
        univer.registerPlugin(UniverSheetsFormulaUIPlugin);
        univer.registerPlugin(UniverSheetsNumfmtPlugin);
        univer.registerPlugin(UniverSheetsNumfmtUIPlugin);

        univer.createUnit(UniverInstanceType.UNIVER_SHEET, {});
        univerAPI = FUniver.newAPI(univer);
        univerAPI.createWorkbook({});

        // Set cleanup function
        cleanup = () => {
          if (univerAPI) {
            univerAPI.dispose();
            univerAPI = null;
          }
        };
      } catch (error) {
        console.error('Failed to initialize Univer:', error);
      }
    }

    initUniver();

    // Return cleanup function for $effect
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  });
</script>



<div 	bind:this={containerRef} class="univer-container"></div>

<style>
	.univer-container {
		width: 100%;
		height: 600px;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
	}

	:global(.univer-container .univer-workbench) {
		height: 100% !important;
	}
</style>