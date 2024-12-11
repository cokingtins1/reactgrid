import { createColumnHelper } from "@tanstack/react-table";
import { Task } from "./TaskTable";
import TableCell from "./TableCell";

export const createTeamColumn = (
	rate: { key: keyof Task; value: number },
	data: any[],
	setData: React.Dispatch<React.SetStateAction<Task[]>>,
	updateTotals: (newData: Task[]) => void
) => {
	const columnHelper = createColumnHelper<Task>();

	return columnHelper.accessor(rate.key, {
		header: () => (
			<div>
				<div>{rate.key.toUpperCase()}</div>
				<div>${rate.value}</div>
			</div>
		),

		cell: (info) => (
			<TableCell
				getValue={info.getValue}
				row={info.row.original}
				column={{ id: rate.key }}
				table={{
					options: {
						meta: {
							updateData: (
								rowIndex: number,
								columnId: keyof Task,
								value: number | null | string | undefined
							) => {
								const newData = [...data];
								newData[rowIndex][columnId] = value;
								updateTotals(newData);
								setData(newData);
							},
						},
					},
				}}
			/>
		),
	});
};
