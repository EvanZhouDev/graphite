import { useContext } from "react";
import { FileContext } from "@/providers/file";
import AddButton from "./addButton";

function ToolLabel({ icon, label, tooltip }) {
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

let formalityMap = {
	0: "Loading...",
	1: "Very Informal",
	2: "Mostly Informal",
	3: "Moderately Formal",
	4: "Mostly Formal",
	5: "Very Formal",
};

function FormalitySlider({ value }) {
	let { setMemory } = useContext(FileContext);

	return (
		<div className="flex items-center mb-3 w-full">
			<input
				type="range"
				min="1"
				max="5"
				value={value}
				onChange={(e) =>
					setMemory((mem) => ({
						...mem,
						formality: e.target.value,
					}))
				}
				class={`formality-slider`}
			></input>
			<span className="ml-2 text-[15px] text-dim w-[9vw]">
				{formalityMap[value].split(" ")[0]}
				<br />
				{formalityMap[value].split(" ")[1]}
			</span>
		</div>
	);
}

function Tags({ tags, attributeName }) {
	let { setMemory } = useContext(FileContext);

	return (
		<>
			<div className="flex flex-wrap -ml-1 mb-3">
				{tags.map((tag) => (
					<span className="bg-tertiary p-2 rounded-xl font-medium m-1 flex items-center">
						{tag}
						<button
							className="flex items-center justify-center"
							onClick={() => {
								setMemory((mem) => {
									const index = mem[attributeName].findIndex((t) => t == tag);
									if (index > -1) {
										return {
											...mem,
											[attributeName]: [
												...mem[attributeName].slice(0, index),
												...mem[attributeName].slice(index + 1),
											],
										};
									}
									return mem;
								});
							}}
						>
							<span className="material-symbols-outlined text-[20px] ml-1">
								close
							</span>
						</button>
					</span>
				))}
				<AddButton
					onSubmit={(val) =>
						setMemory((mem) => ({
							...mem,
							[attributeName]: [...mem[attributeName], val],
						}))
					}
				/>
			</div>
		</>
	);
}

export default function MemoryTools({ tool, active }) {
	return (
		<div className={`mt-4 ${active ? "" : "pointer-events-none grayscale"}`}>
			{tool.updateMap.formality && (
				<div>
					<ToolLabel icon="work" label="FORMALITY" />
					<FormalitySlider value={tool.args.formality} />
				</div>
			)}

			{tool.updateMap.audience && (
				<div>
					<ToolLabel icon="person" label="AUDIENCE" />
					<Tags tags={tool.args.audience} attributeName="audience" />
				</div>
			)}

			{tool.updateMap.intent && (
				<div>
					<ToolLabel icon="location_on" label="INTENTS" />
					<Tags tags={tool.args.intent} attributeName="intent" />
				</div>
			)}

			{tool.updateMap.summary && (
				<div className="pointer-events-auto">
					<ToolLabel
						icon="info"
						label="New Summary Generated"
						tooltip={tool.args.summary}
					/>
				</div>
			)}
		</div>
	);
}
