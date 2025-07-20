import { LocaleType } from '@univerjs/core';
import type { UniverWorkbookData, UniverSheetData, UniverCellData } from './univer-types.js';

/**
 * 创建默认的工作簿数据
 */
export function createDefaultWorkbookData(options: {
	id?: string;
	name?: string;
	locale?: LocaleType;
}): UniverWorkbookData {
	const { id = 'workbook-01', name = 'UniverSheet', locale = LocaleType.ZH_CN } = options;

	return {
		id,
		locale,
		name,
		sheetOrder: ['sheet-01'],
		appVersion: '3.0.0-alpha',
		sheets: {
			'sheet-01': createDefaultSheetData('sheet-01', 'Sheet1')
		},
		styles: {
			s1: {
				fs: 12,
				bg: {
					rgb: '#FFFFFF'
				}
			}
		}
	};
}

/**
 * 创建默认的工作表数据
 */
export function createDefaultSheetData(id: string, name: string): UniverSheetData {
	return {
		id,
		name,
		tabColor: '',
		hidden: 0,
		rowCount: 1000,
		columnCount: 20,
		zoomRatio: 1,
		scrollTop: 0,
		scrollLeft: 0,
		defaultColumnWidth: 93,
		defaultRowHeight: 27,
		mergeData: [],
		cellData: {},
		rowData: {},
		columnData: {},
		showGridlines: 1,
		rowHeader: {
			width: 46,
			hidden: 0
		},
		columnHeader: {
			height: 20,
			hidden: 0
		},
		selections: ['A1'],
		rightToLeft: 0
	};
}

/**
 * 创建单元格数据
 */
export function createCellData(value: any, styleId?: string, type?: number): UniverCellData {
	const cellData: UniverCellData = {
		v: value
	};

	if (styleId) {
		cellData.s = styleId;
	}

	if (type !== undefined) {
		cellData.t = type;
	}

	return cellData;
}

/**
 * 设置单元格值
 */
export function setCellValue(
	workbookData: UniverWorkbookData,
	sheetId: string,
	row: number,
	col: number,
	value: any,
	styleId?: string
): UniverWorkbookData {
	const sheet = workbookData.sheets[sheetId];
	if (!sheet) {
		throw new Error(`Sheet with id ${sheetId} not found`);
	}

	if (!sheet.cellData[row]) {
		sheet.cellData[row] = {};
	}

	sheet.cellData[row][col] = createCellData(value, styleId, 1);

	return { ...workbookData };
}

/**
 * 获取单元格值
 */
export function getCellValue(
	workbookData: UniverWorkbookData,
	sheetId: string,
	row: number,
	col: number
): any {
	const sheet = workbookData.sheets[sheetId];
	if (!sheet || !sheet.cellData[row] || !sheet.cellData[row][col]) {
		return undefined;
	}

	return sheet.cellData[row][col].v;
}

/**
 * 批量设置单元格数据
 */
export function setBatchCellData(
	workbookData: UniverWorkbookData,
	sheetId: string,
	data: Array<{ row: number; col: number; value: any; styleId?: string }>
): UniverWorkbookData {
	const newWorkbookData = { ...workbookData };

	data.forEach(({ row, col, value, styleId }) => {
		setCellValue(newWorkbookData, sheetId, row, col, value, styleId);
	});

	return newWorkbookData;
}

/**
 * 将二维数组转换为Univer单元格数据
 */
export function arrayToUniverData(
	array: any[][],
	startRow: number = 0,
	startCol: number = 0,
	styleId?: string
): Record<number, Record<number, UniverCellData>> {
	const cellData: Record<number, Record<number, UniverCellData>> = {};

	array.forEach((row, rowIndex) => {
		const actualRow = startRow + rowIndex;
		cellData[actualRow] = {};

		row.forEach((cell, colIndex) => {
			const actualCol = startCol + colIndex;
			cellData[actualRow][actualCol] = createCellData(cell, styleId, 1);
		});
	});

	return cellData;
}

/**
 * 将Univer单元格数据转换为二维数组
 */
export function univerDataToArray(
	cellData: Record<number, Record<number, UniverCellData>>,
	maxRow?: number,
	maxCol?: number
): any[][] {
	const rows = Object.keys(cellData).map(Number).sort((a, b) => a - b);
	const cols: number[] = [];

	// 找出所有列
	rows.forEach((row) => {
		Object.keys(cellData[row]).forEach((col) => {
			const colNum = Number(col);
			if (!cols.includes(colNum)) {
				cols.push(colNum);
			}
		});
	});

	cols.sort((a, b) => a - b);

	const finalMaxRow = maxRow ?? Math.max(...rows) + 1;
	const finalMaxCol = maxCol ?? Math.max(...cols) + 1;

	const result: any[][] = [];

	for (let row = 0; row < finalMaxRow; row++) {
		result[row] = [];
		for (let col = 0; col < finalMaxCol; col++) {
			result[row][col] = cellData[row]?.[col]?.v ?? '';
		}
	}

	return result;
}

/**
 * 创建示例数据
 */
export function createSampleData(): UniverWorkbookData {
	const workbookData = createDefaultWorkbookData({
		id: 'sample-workbook',
		name: 'Sample Workbook'
	});

	// 添加示例数据
	const sampleCellData = arrayToUniverData([
		['Name', 'Age', 'City', 'Salary'],
		['Alice', 25, 'New York', 50000],
		['Bob', 30, 'San Francisco', 75000],
		['Charlie', 35, 'Los Angeles', 60000],
		['Diana', 28, 'Chicago', 55000]
	]);

	workbookData.sheets['sheet-01'].cellData = sampleCellData;

	return workbookData;
}
