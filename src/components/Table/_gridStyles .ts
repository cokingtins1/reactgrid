type CellStyles = {
	header: React.CSSProperties;
	subHeader: React.CSSProperties;
	explanation: React.CSSProperties;
	data: React.CSSProperties;
	grayedOut: React.CSSProperties;
	default: React.CSSProperties;
};
export const cellStyles: CellStyles = {
	header: {
		backgroundColor: "hsl(var(--background))",
		color: "hsl(var(--foreground))",
		fontSize: "var(--table-font-size)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: "bold",
	},
	subHeader: {
		backgroundColor: "#ffffff",
		color: "#000000",
		fontSize: "var(--table-font-size)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: "bold",
	},
	explanation: {
		backgroundColor: "#ffffff",
		color: "#000000",
		fontSize: "var(--table-font-size)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	data: {
		backgroundColor: "#ffffff",
		color: "#000000",
		fontSize: "var(--table-font-size)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	grayedOut: {
		backgroundColor: "#e6e6e6",
		color: "#000000",
		fontSize: "var(--table-font-size)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	default: {
		backgroundColor: "#e6e6e6",
		color: "#000000",
		fontSize: "var(--table-font-size)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
};
