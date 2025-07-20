import type { Univer, LocaleType } from '@univerjs/core';

// Univer Sheet 配置接口
export interface UniverSheetConfig {
	id?: string;
	name?: string;
	locale?: LocaleType;
	theme?: any;
	width?: string | number;
	height?: string | number;
	data?: UniverWorkbookData;
}

// Univer 工作簿数据结构
export interface UniverWorkbookData {
	id: string;
	locale: LocaleType;
	name: string;
	sheetOrder: string[];
	appVersion: string;
	sheets: Record<string, UniverSheetData>;
	styles?: Record<string, UniverCellStyle>;
}

// Univer 工作表数据结构
export interface UniverSheetData {
	id: string;
	name: string;
	tabColor?: string;
	hidden: number;
	rowCount: number;
	columnCount: number;
	zoomRatio: number;
	scrollTop: number;
	scrollLeft: number;
	defaultColumnWidth: number;
	defaultRowHeight: number;
	mergeData: any[];
	cellData: Record<number, Record<number, UniverCellData>>;
	rowData?: Record<number, UniverRowData>;
	columnData?: Record<number, UniverColumnData>;
	showGridlines: number;
	rowHeader: {
		width: number;
		hidden: number;
	};
	columnHeader: {
		height: number;
		hidden: number;
	};
	selections: string[];
	rightToLeft: number;
}

// Univer 单元格数据结构
export interface UniverCellData {
	v?: any; // value
	s?: string; // style id
	t?: number; // type
	f?: string; // formula
}

// Univer 行数据结构
export interface UniverRowData {
	h?: number; // height
	hd?: number; // hidden
}

// Univer 列数据结构
export interface UniverColumnData {
	w?: number; // width
	hd?: number; // hidden
}

// Univer 单元格样式结构
export interface UniverCellStyle {
	fs?: number; // font size
	bg?: {
		rgb: string;
	};
	ff?: string; // font family
	bl?: number; // bold
	it?: number; // italic
	ul?: number; // underline
	cl?: {
		rgb: string;
	}; // color
}

// Univer 事件回调类型
export interface UniverEventCallbacks {
	onReady?: (univer: Univer) => void;
	onChange?: (data: UniverWorkbookData) => void;
	onSelectionChange?: (selection: any) => void;
	onCellEdit?: (cellInfo: any) => void;
}

// Univer 组件 Props 类型
export interface UniverSheetProps extends UniverSheetConfig, UniverEventCallbacks {
	className?: string;
}
