"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import { useTheme } from "next-themes";

function SidebarTab({ icon, title, selected, href, onClick }) {
	function SidebarTabContent() {
		return (
			<>
				<div
					className={`${
						selected && "bg-accent !font-semibold"
					} font-normal w-min h-min px-5 py-2 rounded-full flex items-center justify-center material-symbols-outlined text-[23px] p-0 transition-all`}
				>
					{icon}
				</div>
				<span className="text-sm font-[550] mt-1">{title}</span>
			</>
		);
	}
	return href ? (
		<Link
			className={`flex flex-col items-center justify-center mt-5 ${
				selected ? "sidebar-button-active" : "sidebar-button"
			}`}
			href={href}
		>
			<SidebarTabContent />
		</Link>
	) : (
		<button
			className={`flex flex-col items-center justify-center mt-5 sidebar-button`}
			onClick={onClick}
		>
			<SidebarTabContent />
		</button>
	);
}

export default function Sidebar() {
	const pathname = usePathname();
	return (
		<div className="w-[5vw] rounded-xl flex flex-col items-center justify-between">
			<div className="flex flex-col items-center" suppressHydrationWarning>
				<Image
					src="/graphite-black.svg"
					width={30}
					height={30}
					className={`mt-3 dark:invert`}
					alt="Graphite Logo"
				/>
				<SidebarTab
					icon="edit"
					title="Editor"
					href="/"
					selected={pathname === "/"}
				/>
				<SidebarTab
					icon="book"
					title="Library"
					href="/library"
					selected={pathname === "/library"}
				/>
				<SidebarTab
					icon="help"
					title="Help"
					href="/help"
					selected={pathname === "/help"}
				/>
				<SidebarTab
					icon="key"
					title="API Key"
					href="/apikey"
					selected={pathname === "/apikey"}
				/>
				{/* <SidebarTab
					icon="code"
					title="GitHub"
					href="https://github.com/EvanZhouDev/graphite"
				/>
				<SidebarTab
					icon="info"
					title="About"
					href="https://github.com/EvanZhouDev/graphite"
				/> */}
				{/* <SidebarTab
					icon="bomb"
					title="Killswitch"
					onClick={() => {
						localStorage.clear();
						window.location.reload();
					}}
				/> */}
			</div>
			<div>
				<ThemeToggle />
			</div>
		</div>
	);
}
