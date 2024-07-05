import Image from "next/image";

function SidebarTab({ icon, title, selected, href, onClick }) {
	return (
		<button
			className={`flex flex-col items-center justify-center mt-5 ${
				selected ? "sidebar-button-active" : "sidebar-button"
			}`}
			onClick={() => {
				if (href) {
					window.location.href = href;
				}
				if (onClick) onClick();
			}}
		>
			<div
				className={`${
					selected && "bg-accent font-semibold"
				} font-normal w-min h-min px-5 py-2 rounded-full flex items-center justify-center material-symbols-outlined text-[23px] p-0 transition-all`}
			>
				{icon}
			</div>
			<span className="text-sm font-[550] mt-1">{title}</span>
		</button>
	);
}

export default function Sidebar() {
	return (
		<div className="w-[5vw] rounded-xl flex flex-col items-center justify-between">
			<div className="flex flex-col items-center">
				<Image
					src="/graphite-black.svg"
					width={30}
					height={30}
					className="mt-3"
				/>
				<SidebarTab icon="edit" title="Editor" selected />
				<SidebarTab icon="book" title="Library" />
				<SidebarTab
					icon="code"
					title="GitHub"
					href="https://github.com/EvanZhouDev/graphite"
				/>
				<SidebarTab
					icon="info"
					title="About"
					href="https://github.com/EvanZhouDev/graphite"
				/>
				<SidebarTab
					icon="bomb"
					title="Killswitch"
					onClick={() => {
						localStorage.clear();
						window.location.reload();
					}}
				/>
			</div>
			<div>
				<div className={`material-symbols-outlined text-[30px] mb-3`}>
					dark_mode
				</div>
			</div>
		</div>
	);
}
