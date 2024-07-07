/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				surface: "var(--surface)",
				"surface-container": "var(--surface-container)",
				"surface-container-hover": "var(--surface-container-hover)",
				primary: "var(--primary)",
				"primary-container": "var(--primary-container)",
				"primary-container-hover": "var(--primary-container-hover)",
				secondary: "var(--secondary)",
				"secondary-container": "var(--secondary-container)",
				"secondary-container-hover": "var(--secondary-container-hover)",
				tertiary: "var(--tertiary)",
				dim: "#A6A6A6",
				accent: "var(--accent)",
			},
		},
	},
	plugins: [],
};
