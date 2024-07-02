/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				surface: "#FFF",
				"surface-container": "#F8FAFD",
				primary: "#1C73E8",
				"primary-container": "#F4F6FC",
				secondary: "#D2E3FC",
				"secondary-container": "#F0F4F8",
				"secondary-container-hover": "#DDE3EA",
				dim: "#A6A6A6",
			},
		},
	},
	plugins: [],
};
