export default function ToolLabel({ icon, label, tooltip }) {
	return (
		<span className="text-dim font-light flex items-center mb-1 relative">
			<span className="material-symbols-outlined font-light mr-1 icon">
				{icon}
			</span>
			{tooltip && (
				<div className="absolute tooltip left-7 bg-tertiary p-3 rounded-xl text-black dark:text-white font-normal border-dim border-[0.5px] mb-1">
					{tooltip}
				</div>
			)}

			{label}
		</span>
	);
}
