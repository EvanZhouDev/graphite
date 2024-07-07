"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="material-symbols-outlined text-[30px] mb-3 p-3 hover:bg-surface-container-hover rounded-full transition-colors"
		>
			{theme === "dark" ? "light_mode" : "dark_mode"}
		</button>
	);
};

export default ThemeSwitcher;
