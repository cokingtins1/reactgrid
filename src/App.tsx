import "./App.css";
import { CustomTable } from "./components/CustomTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sandbox from "./dist/sandbox/Sandbox";
import Sandbox2 from "./dist/sandbox2/Sandbox2";
import Sandbox3 from "./dist/sandbox3/sandbox3";

function App() {
	const data = [
		{
			task: "Study/Report", // Department Task
			item: 1, // Item #
			assumption: "1 day", // Assumptions
			mgr: 215, // MGR rate
			sptl: 200, // SPTL rate
			ptl: 165, // PTL rate
			ps: 125, // PS rate
			coop: 70, // COOP rate
			totalHours: 16, // Total Hours
			totalDollars: 2920, // Total Dollars
		},
		{
			task: "Programming", // Department Task
			item: 2, // Item #
			assumption: "2 days", // Assumptions
			mgr: 215, // MGR rate
			sptl: 200, // SPTL rate
			ptl: 165, // PTL rate
			ps: 125, // PS rate
			coop: 70, // COOP rate
			totalHours: 24, // Total Hours
			totalDollars: 4380, // Total Dollars
		},
	];

	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<div className="flex justify-center">
								<CustomTable dbData={data} />
							</div>
						}
					/>
					<Route path="/sandbox" element={<Sandbox />} />
					<Route path="/sandbox2" element={<Sandbox2 />} />
					<Route path="/sandbox3" element={<Sandbox3 />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
