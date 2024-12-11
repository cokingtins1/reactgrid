import { TableCell } from './data';

const generateCells = (data:TableCell[]) => {
	const DEPT = "H"
	const PROJECTNUMBER = 11035
	const PHASE = 1

	const headerCells = data.filter((cell) => cell.header === true)
}