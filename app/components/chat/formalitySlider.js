import { FileContext } from "@/providers/file";
import { useContext } from "react";

let formalityMap = {
	0: "Not Set",
	1: "Very Informal",
	2: "Mostly Informal",
	3: "Moderately Formal",
	4: "Mostly Formal",
	5: "Very Formal",
};

export default function FormalitySlider({ value }) {
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
