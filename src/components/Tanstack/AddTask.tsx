import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Task } from "./TaskTable";

type AddTaskProps = {
	table: {
		options: {
			meta: {
				addRow: () => void;
			};
		};
	};
	// table: Table<Task>;
};

export default function AddTask({ table }: AddTaskProps) {
	const meta = table.options.meta;

	return (
		<Button onClick={() => table.options.meta.addRow()}>+ Add New</Button>
	);
}
