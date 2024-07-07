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
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			className="material-symbols-outlined text-[30px] mb-3 p-3 hover:bg-surface-container-hover rounded-full transition-colors"
		>
			{theme === "light" ? "dark_mode" : "light_mode"}
		</button>
	);
};

export default ThemeSwitcher;
