import { Inter } from "next/font/google";
import "material-symbols";
import "./globals.css";
import Sidebar from "@/components/sidebar/";
import ThemeProvider from "./providers/theme.js";
import OnboardingRouter from "./onboardingRouter";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmallScreenOverlay from "./components/smallScreenOverlay";
import ClientOnly from "./components/clientOnly";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Graphite Editor",
	description: "The writing assistant that writes with you, not for you.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Analytics />
				<SpeedInsights />
				<OnboardingRouter />
				<ThemeProvider>
					<div className="bg-surface-container flex w-screen h-screen gap-3 p-3 overflow-hidden">
						<Sidebar />
						{children}
					</div>
				</ThemeProvider>
				<ClientOnly>
					<SmallScreenOverlay />
				</ClientOnly>
			</body>
		</html>
	);
}
