import { Button } from "@/components/ui/button";
import React, { ReactNode, useEffect, useState } from "react";

interface ThemeProviderProps {
	children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<"dark" | "light">(
		typeof window !== "undefined" &&
			localStorage.getItem("theme") === "light"
			? "light"
			: "dark"
	);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [theme]);

	const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

	return (
		<div>
			<Button className="fixed bottom-5 right-5" onClick={toggleTheme}>
				Toggle Theme
			</Button>
			{children}
		</div>
	);
};

export default ThemeProvider;
