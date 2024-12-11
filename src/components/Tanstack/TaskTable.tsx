import * as React from "react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	TableMeta,
	useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createTeamColumn } from "./createTeamColumn";
import { cn } from "@/lib/utils";
import { defaultData, rates } from "./data";
import AddTask from "./AddTask";

export type Task = {
	id: number;
	task: string;
	assumptions: string;
	mgr?: number | null;
	sptl?: number | null;
	ptl?: number | null;
	ps?: number | null;
	coop?: number | null;
	totalHours: number;
	totalDollars: number;
};

const columnHelper = createColumnHelper<Task>();

export default function TaskTracker() {
	const [data, setData] = React.useState(() => defaultData);
	const [originalData, setOriginalData] = React.useState(() => [
		...defaultData,
	]);

	const updateTotals = (newData: Task[]) => {
		newData.forEach((row) => {
			row.totalHours = rates.reduce((sum, rate) => {
				const key = rate.key;
				return sum + ((row[key] as number) || 0);
			}, 0);

			row.totalDollars = rates.reduce((sum, rate) => {
				const key = rate.key;
				return sum + ((row[key] as number) || 0) * rate.value;
			}, 0);
		});
	};

	const teamMemeberColumns = rates.map((rate) =>
		createTeamColumn(rate, data, setData, updateTotals)
	);

	const columns = [
		columnHelper.accessor("id", {
			header: "Item #",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("task", {
			header: "Department Task",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("assumptions", {
			header: "Assumptions",
			enableResizing: true,
			cell: (info) => {
				const [localValue, setLocalValue] = React.useState(
					info.getValue()
				);

				const handleBlur = () => {
					const newData = [...data];
					newData[info.row.index].assumptions = localValue;
					setData(newData);
				};

				return (
					<Input
						value={localValue}
						onChange={(e) => setLocalValue(e.target.value)}
						onBlur={handleBlur}
					/>
				);
			},
		}),
		...teamMemeberColumns,
		columnHelper.accessor("totalHours", {
			header: "Total Hours",
			cell: (info) => info.getValue().toFixed(2),
		}),
		columnHelper.accessor("totalDollars", {
			header: "Total Dollars",
			cell: (info) => `$${info.getValue().toFixed(2)}`,
		}),
	];

	const table = useReactTable<Task>({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
			updateData: (rowIndex: number, columnId: string, value: string) => {
				setData((prev) =>
					prev.map((row, index) => {
						if (index === rowIndex) {
							return {
								...prev[rowIndex],
								[columnId]: value,
							};
						}
						return row;
					})
				);
			},
			addRow: () => {
				const newTask: Task = {
					id: Math.floor(Math.random() * 1000),
					task: "",
					assumptions: "",
					mgr: null,
					sptl: null,
					ptl: null,
					ps: null,
					coop: null,
					totalHours: 0,
					totalDollars: 0,
				};
				// const setFunc = (prev: Task[]) => [...prev, newTask];
				// setData(setFunc);
				// setOriginalData(setFunc)
				setData((prev) => {
					const updatedData = [...prev, newTask];
					setOriginalData(updatedData);
					return updatedData;
				});
			},
		},
	});

	const totals = React.useMemo(() => {
		return data.reduce(
			(acc, row) => {
				acc.hours += row.totalHours;
				acc.dollars += row.totalDollars;
				return acc;
			},
			{ hours: 0, dollars: 0 }
		);
	}, [data]);

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Department Task Tracker</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="text-center"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className={cn(
												"text-center whitespace-nowrap",
												{
													"text-left":
														cell.column.columnDef
															.header ===
														"Department Task",
												}
											)}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))}
							<TableRow className="font-bold">
								<TableCell colSpan={2}>
									<AddTask table={table} />
								</TableCell>
								<TableCell colSpan={3} className="text-right">
									Totals:
								</TableCell>
								<TableCell colSpan={3} />
								<TableCell className="text-center">
									{totals?.hours.toFixed(2)}
								</TableCell>
								<TableCell className="text-center">
									${totals?.dollars.toFixed(2)}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}
