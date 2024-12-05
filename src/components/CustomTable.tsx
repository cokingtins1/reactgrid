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

type Person = {
	id: string;
	description: string;
	age: number;
	email: string;
	company: string;
};

const peopleData = [
	{
		id: "66d61077035753f369ddbb16",
		description: "Jordan Rodriquez",
		age: 30,
		email: "jordanrodriquez@cincyr.com",
		company: "Zaggles",
	},
	{
		id: "66d61077794e7949ab167fd5",
		email: "allysonrios@satiance.com",
		description: "Allyson Rios",
		age: 30,
		company: "Zoxy",
	},
	{
		id: "66d61077dd754e88981ae434",
		description: "Pickett Lucas",
		age: 25,
		email: "pickettlucas@zoxy.com",
		company: "Techade",
	},
	{
		id: "66d61077115e2f8748c334d9",
		description: "Louella David",
		age: 37,
		email: "louelladavid@techade.com",
		company: "Ginkogene",
	},
	{
		id: "66d61077540d53374b427e4b",
		description: "Tricia Greene",
		age: 27,
		email: "triciagreene@ginkogene.com",
		company: "Naxdis",
	},
];

const getRows = (people: Person[]): Row[] => [
	// header row
	{
		rowIndex: 0,
		height: 40,
	},
	// data rows
	...people.map((_, i) => ({
		rowIndex: i + 1,
		height: 40,
	})),
];

const getColumns = (): Column[] => [
	{ colIndex: 0, width: 220 },
	{ colIndex: 1, width: 220 },
	{ colIndex: 2, width: 220 },
	{ colIndex: 3, width: 220 },
];

type UpdatePerson = <T>(id: string, key: string, newValue: T) => void;

const generateCells = (
	people: Person[],
	updatePerson: UpdatePerson
): Cell[] => {
	const generateHeaderCells = () => {
		const titles = ["Description", "Age", "Email", "Company"];

		return titles.map((title, colIndex) => ({
			rowIndex: 0,
			colIndex,
			Template: NonEditableCell,
			props: {
				value: title,
				style: cellStyles.header,
			},
		}));
	};

	const generateRowCells = (rowIndex: number, person: Person): Cell[] => {
		const { id, description, age, email, company } = person;

		return [
			{
				rowIndex,
				colIndex: 0,
				Template: TextCell,
				props: {
					text: description,
					style: cellStyles.fields,
					onTextChanged: (newText: string) =>
						updatePerson(id, "description", newText),
				},
			},
			{
				rowIndex,
				colIndex: 1,
				Template: NumberCell,
				props: {
					value: age,
					style: cellStyles.fields,
					onValueChanged: (newValue: number) =>
						updatePerson(id, "age", newValue),
				},
			},
			{
				rowIndex,
				colIndex: 2,
				Template: TextCell,
				props: {
					text: email,
					style: cellStyles.fields,
					onTextChanged: (newText: string) =>
						updatePerson(id, "email", newText),
				},
			},
			{
				rowIndex,
				colIndex: 3,
				Template: TextCell,
				props: {
					text: company,
					style: cellStyles.fields,
					onTextChanged: (newText: string) =>
						updatePerson(id, "company", newText),
				},
			},
		];
	};

	const headerCells = generateHeaderCells();
	const rowCells = people.flatMap((person, idx) =>
		generateRowCells(idx + 1, person)
	);
	return [...headerCells, ...rowCells];
};

export const CustomTable = () => {
	const [people, setPeople] = useState(peopleData);

	const updatePerson = (id: string, key: string, newValue: any) => {
		setPeople((prev) => {
			return prev.map((p) =>
				p.id === id ? { ...p, [key]: newValue } : p
			);
		});
	};

	const rows = getRows(people);
	const [columns, setColumns] = useState(getColumns());
	const cells = generateCells(people, updatePerson);

	return (
		<div>
			<ReactGrid rows={rows} columns={columns} cells={cells} />
		</div>
	);
};
