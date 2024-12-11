import {
	Cell,
	Column,
	NonEditableCell,
	NumberCell,
	ReactGrid,
	Row,
	TextCell,
} from "@silevis/reactgrid";
import { useState } from "react";
import { cellStyles } from "./Table/_gridStyles ";

type WBSRow = {
	id: string;
	itemNum: number;
	departmentTask: string;
	assumptions: string;
	company: string;
};

const rowData = [
	{
		id: "66d61077035753f369ddbb16",
		itemNum: 1,
		departmentTask: "Existing Utility Capacity Analysis",
		assumptions: "Color Plans (temp and pressurization)",
		company: "Zaggles",
	},
];

const getRows = (dataLength: number): Row[] => [
	{ rowIndex: 0, height: 50 },
	{ rowIndex: 1, height: 70 },
	{ rowIndex: 2, height: 40 },
	...Array.from({ length: dataLength }, (_, i) => ({
		rowIndex: i + 3,
		height: 40,
	})),
];

const columnConfig = [
	{ width: 150 }, // A: Department Task
	{ width: 50 }, // B: Item #
	{ width: 200 }, // C: Assumptions
	{ width: 100 }, // D: MGR
	{ width: 100 }, // E: SPTL
	{ width: 100 }, // F: PTL
	{ width: 100 }, // G: PS
	{ width: 100 }, // H: COOP
	{ width: 120 }, // I: Total Hours
	{ width: 120 }, // J: Total Dollars
];

const getColumns = (columnConfig: { width: number }[]): Column[] =>
	columnConfig.map((config, i) => ({
		colIndex: i,
		width: config.width,
	}));

type updateRow = <T>(id: string, key: string, newValue: T) => void;

const generateCells = (
	data: any[], // Data fetched from the database
	updateCell: (row: number, col: number, value: any) => void
): Cell[] => {
	const headerCells = [
		// Instruction row
		{
			rowIndex: 0,
			colIndex: 2,
			Template: NonEditableCell,
			props: {
				value: "Assign an Associate or a Generic Code: MGR, SPTL, PTL, PS, COOP",
				style: cellStyles.explanation,
			},
		},
		{
			rowIndex: 1,
			colIndex: 2,
			Template: NonEditableCell,
			props: {
				value: "If you assigned an Assoicate, enter their rate; If using a Generic Code use the pre-established generic rate that is automatically filled in.",
				style: cellStyles.explanation,
			},
		},
		// Header row 1
		{
			rowIndex: 0,
			colIndex: 3,
			Template: NonEditableCell,
			props: { value: "MGR", style: cellStyles.header },
		},
		{
			rowIndex: 0,
			colIndex: 4,
			Template: NonEditableCell,
			props: { value: "SPTL", style: cellStyles.header },
		},
		{
			rowIndex: 0,
			colIndex: 5,
			Template: NonEditableCell,
			props: { value: "PTL", style: cellStyles.header },
		},
		{
			rowIndex: 0,
			colIndex: 6,
			Template: NonEditableCell,
			props: { value: "PS", style: cellStyles.header },
		},
		{
			rowIndex: 0,
			colIndex: 7,
			Template: NonEditableCell,
			props: { value: "COOP", style: cellStyles.header },
		},
		{
			rowIndex: 2,
			colIndex: 8,
			Template: NonEditableCell,
			props: { value: "Total Hours", style: cellStyles.header },
		},
		{
			rowIndex: 2,
			colIndex: 9,
			Template: NonEditableCell,
			props: { value: "Total Dollars", style: cellStyles.header },
		},
		{
			rowIndex: 1,
			colIndex: 3,
			Template: NonEditableCell,
			props: { value: 215, style: cellStyles.subHeader },
		},
		{
			rowIndex: 1,
			colIndex: 4,
			Template: NonEditableCell,
			props: { value: 200, style: cellStyles.subHeader },
		},
		{
			rowIndex: 1,
			colIndex: 5,
			Template: NonEditableCell,
			props: { value: 165, style: cellStyles.subHeader },
		},
		{
			rowIndex: 1,
			colIndex: 6,
			Template: NonEditableCell,
			props: { value: 125, style: cellStyles.subHeader },
		},
		{
			rowIndex: 1,
			colIndex: 7,
			Template: NonEditableCell,
			props: { value: 70, style: cellStyles.subHeader },
		},
		{
			rowIndex: 2,
			colIndex: 0,
			Template: NonEditableCell,
			props: { value: "Item #", style: cellStyles.header },
		},
		{
			rowIndex: 2,
			colIndex: 1,
			Template: NonEditableCell,
			props: { value: "Department Task", style: cellStyles.header },
		},
		{
			rowIndex: 2,
			colIndex: 2,
			Template: NonEditableCell,
			props: { value: "Assumptions", style: cellStyles.header },
		},
		{
			rowIndex: 2,
			colIndex: 3,
			Template: NonEditableCell,
			props: { style: cellStyles.grayedOut },
		},
		{
			rowIndex: 2,
			colIndex: 4,
			Template: NonEditableCell,
			props: { style: cellStyles.grayedOut },
		},
		{
			rowIndex: 2,
			colIndex: 5,
			Template: NonEditableCell,
			props: { style: cellStyles.grayedOut },
		},
		{
			rowIndex: 2,
			colIndex: 6,
			Template: NonEditableCell,
			props: { style: cellStyles.grayedOut },
		},
		{
			rowIndex: 2,
			colIndex: 7,
			Template: NonEditableCell,
			props: { style: cellStyles.grayedOut },
		},
	];

	const dataCells = data.flatMap((rowData, rowIndex) => {
		const dbRowIndex = rowIndex + 3; // Data rows start at index 3
		return [
			{
				rowIndex: dbRowIndex,
				colIndex: 0,
				Template: TextCell,
				props: { value: rowData.task },
			},
			{
				rowIndex: dbRowIndex,
				colIndex: 1,
				Template: TextCell,
				props: { value: rowData.item },
			},
			{
				rowIndex: dbRowIndex,
				colIndex: 2,
				Template: TextCell,
				props: { value: rowData.assumption },
			},
			...["mgr", "sptl", "ptl", "ps", "coop"].map((key, colIndex) => ({
				rowIndex: dbRowIndex,
				colIndex: colIndex + 3, // D:H
				Template: TextCell,
				props: {
					value: rowData[key],
					onTextChanged: (newValue: string) =>
						updateCell(dbRowIndex, colIndex + 3, newValue),
				},
			})),
			{
				rowIndex: dbRowIndex,
				colIndex: 8, // Total Hours
				Template: NonEditableCell,
				props: { value: rowData.totalHours },
			},
			{
				rowIndex: dbRowIndex,
				colIndex: 9, // Total Dollars
				Template: NonEditableCell,
				props: { value: rowData.totalDollars },
			},
		];
	});

	return [...headerCells, ...dataCells];
};

export const CustomTable = ({ dbData }: { dbData: any[] }) => {
	const [data, setData] = useState(dbData);

	const updateCell = (rowIndex: number, colIndex: number, value: any) => {
		setData((prev) => {
			const updated = [...prev];
			const rowToUpdate = rowIndex - 3; // Adjust for header offset
			updated[rowToUpdate][colIndex] = value;
			return updated;
		});
	};

	const rows = getRows(data.length);
	const columns = getColumns(columnConfig);
	const cells = generateCells(data, updateCell);

	return <ReactGrid rows={rows} columns={columns} cells={cells} />;
};
