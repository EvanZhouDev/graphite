import FormalitySlider from "./formalitySlider.js";
import ToolLabel from "./toolLabel.js";
import Tags from "./tags.js";

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
