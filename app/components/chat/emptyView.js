import Image from "next/image";

function SuggestionCard({ text, icon }) {
	return (
		<button className="bg-secondary-container h-[20vh] p-4 flex flex-col justify-between items-end rounded-xl basis-[calc(50%-4px)] hover:bg-secondary-container-hover transition-colors duration-75 suggestion-card">
			<span className="text-left">{text}</span>
			<div className="material-symbols-outlined text-[#1F1F1F] bg-white p-3 rounded-full">
				{icon}
			</div>
		</button>
	);
}

export default function EmptyView() {
	return (
		<div className="grow flex flex-col items-center justify-center w-full gap-4 p-4">
			<Image
				src="/graphite.png"
				width="100"
				height="100"
				priority
				className="w-[13vh]"
			/>
			<div className="font-semibold text-3xl">Graphite Chat</div>
			<div className="text-dim text-center">
				Tell Graphite about what you're going to write and what you want to
				achieve to start customizing your writing experience.
			</div>
			<div className="flex flex-wrap justify-center gap-2">
				<SuggestionCard
					text="An engaging script for a YouTube video on productivity tips."
					icon="videocam"
				/>
				<SuggestionCard
					text="A persuasive email pitching a new product to potential investors."
					icon="mail"
				/>
				<SuggestionCard
					text="An attention-grabbing social media post announcing an upcoming event."
					icon="event"
				/>
				<SuggestionCard
					text="A creative essay about the impact of technology on modern society."
					icon="draw"
				/>
			</div>
		</div>
	);
}
