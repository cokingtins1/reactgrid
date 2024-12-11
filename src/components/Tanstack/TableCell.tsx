import React from "react";
import { Task } from "./TaskTable";
import { Input } from "../ui/input";

type TableCellProps = {
	getValue: () => number | null | string | undefined;
	row: Task;
	column: { id: keyof Task };
	table: {
		options: {
			meta: {
				updateData: (
					rowIndex: number,
					columnId: keyof Task,
					value: number | null | string | undefined
				) => void;
			};
		};
	};
};

export default function TableCell({
	getValue,
	row,
	column,
	table,
}: TableCellProps) {
	const initialValue = getValue();
	const [value, setValue] = React.useState(initialValue);

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);
	const onBlur = () => {
		table.options.meta?.updateData(row.id - 1, column.id, value);
	};

	return (
		<Input
			value={value || value === 0 ? value : ""}
			onChange={(e) => setValue(Number(e.target.value) || null)}
			onBlur={onBlur}
		/>
	);
}
