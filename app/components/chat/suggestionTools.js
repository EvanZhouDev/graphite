import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileContext } from "@/providers/file";
import { useContext } from "react";
import { PreviewSuggestionContext } from "@/providers/previewSuggestion";

function Suggestion({
	icon,
	title,
	children,
	suggestion,
	suggestionIdx,
	onAccept,
	id,
}) {
	const { explanation } = suggestion;

	const { setToolHistory, setContent, setFile } = useContext(FileContext);
	const [previewSuggestion, setPreviewSuggestion] = useContext(
		PreviewSuggestionContext
	);

	if (suggestion.dismissed) {
		return (
			<div
				className={`bg-[#F2F6FC] rounded-xl flex flex-col p-3 gap-3 my-2 grayscale`}
			>
				<span className="text-[#A6A6A6] font-light flex items-center">
					<span class="material-symbols-outlined font-light mr-1">{icon}</span>
					{title}
					<button
						className="text-[#A6A6A6] ml-4"
						onClick={() => {
							setToolHistory((th) => {
								let toolHistory = structuredClone(th);
								for (let toolCall of toolHistory) {
									if (toolCall.toolCallId === id) {
										toolCall.args.corrections[suggestionIdx].dismissed = false;
									}
								}
								return toolHistory;
							});
							setPreviewSuggestion({
								type: suggestion.actionType,
								anchor: suggestion.anchor,
								text: suggestion.text,
							});
						}}
					>
						Reconsider Suggestion
					</button>
				</span>
			</div>
		);
	}

	if (suggestion.accepted) {
		return (
			<div className={`bg-[#F2F6FC] rounded-xl flex flex-col p-3 gap-3 my-2`}>
				<span className="text-[#A6A6A6] font-light flex items-center">
					<span class="material-symbols-outlined font-light mr-1">{icon}</span>
					{title}
					<span className="bg-[#1C73E8] text-white rounded-full  px-2 ml-2">
						Accepted
					</span>
				</span>
				<span className="text-left font-semibold">{children}</span>
			</div>
		);
	}

	return (
		<div
			className={`bg-[#F2F6FC] rounded-xl flex flex-col p-3 gap-3 my-2`}
			onMouseEnter={() =>
				!suggestion.dismissed &&
				!suggestion.accepted &&
				setPreviewSuggestion({
					type: suggestion.actionType,
					anchor: suggestion.anchor,
					text: suggestion.text,
				})
			}
			onMouseLeave={() => setPreviewSuggestion({})}
		>
			<span className="text-[#A6A6A6] font-light flex items-center">
				<span class="material-symbols-outlined font-light mr-1">{icon}</span>
				{title}
			</span>
			<span className="text-left font-semibold ml-1">{children}</span>
			<div className="text-left text-sm ml-1">
				<Markdown remarkPlugins={[remarkGfm]}>{explanation}</Markdown>
			</div>
			<div>
				<button
					className="bg-[#1C73E8] text-white rounded-full py-1 px-3"
					onClick={() => {
						setFile((f) => {
							let file = structuredClone(f);

							for (let toolCall of file.toolHistory) {
								console.log(id);
								if (toolCall.toolCallId === id) {
									console.log(toolCall, suggestionIdx);
									toolCall.args.corrections[suggestionIdx].accepted = true;
								}
							}
							file.content = onAccept(file.content, suggestion);
							return file;
						});

						setPreviewSuggestion({});
					}}
				>
					Accept
				</button>
				<button
					className="text-[#A6A6A6] ml-4"
					onClick={() => {
						setToolHistory((th) => {
							let toolHistory = structuredClone(th);
							for (let toolCall of toolHistory) {
								if (toolCall.toolCallId === id) {
									toolCall.args.corrections[suggestionIdx].dismissed = true;
								}
							}
							return toolHistory;
						});
					}}
				>
					Dismiss
				</button>
			</div>
		</div>
	);
}

const suggestionTypeMap = {
	add_before: {
		icon: "playlist_add",
		title: "ADD",
		inlinePreview: ({ anchor, text }) => (
			<>
				{text} <span className="text-dim">{anchor}</span>
			</>
		),
		onAccept: (content, { anchor, text }) => {
			const startIndex = content.indexOf(anchor);
			if (startIndex !== -1) {
				return content.slice(0, startIndex) + text + content.slice(startIndex);
			}
			console.log(content);
			return content;
		},
	},
	add_after: {
		icon: "playlist_add",
		title: "ADD",
		inlinePreview: ({ anchor, text }) => (
			<>
				<span className="text-dim">{anchor}</span> {text}
			</>
		),
		onAccept: (content, { anchor, text }) => {
			const startIndex = content.indexOf(anchor) + anchor.length;
			if (startIndex !== -1) {
				return content.slice(0, startIndex) + text + content.slice(startIndex);
			}
			return content;
		},
	},
	replace: {
		icon: "find_replace",
		title: "REPLACEMENT",
		inlinePreview: ({ anchor, text }) => (
			<>
				<s className="text-dim">{anchor}</s> {text}
			</>
		),
		onAccept: (content, { anchor, text }) => content.replaceAll(anchor, text),
	},
	remove: {
		icon: "delete",
		title: "DELETE",
		inlinePreview: ({ anchor }) => (
			<>
				<s className="text-dim">{anchor}</s>
			</>
		),
		onAccept: (content, { anchor }) => content.replaceAll(anchor, ""),
	},
};

export default function SuggestionTools({ tool }) {
	const { setContent } = useContext(FileContext);

	return (
		<div>
			{tool.args.corrections.map((suggestion, i) => {
				let { icon, title, onAccept, inlinePreview } =
					suggestionTypeMap[suggestion.actionType];

				return (
					<Suggestion
						icon={icon}
						title={title}
						onAccept={onAccept}
						suggestion={suggestion}
						suggestionIdx={i}
						id={tool.toolCallId}
					>
						{inlinePreview(suggestion)}
					</Suggestion>
				);
			})}
		</div>
	);
}
