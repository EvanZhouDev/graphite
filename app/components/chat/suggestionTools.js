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

	const { setToolHistory, setFile, file } = useContext(FileContext);
	const [previewSuggestion, setPreviewSuggestion] = useContext(
		PreviewSuggestionContext
	);

	if (suggestion.dismissed) {
		return (
			<div
				className={`bg-[#F2F6FC] dark:bg-[#27292b] rounded-xl flex flex-col p-3 gap-3 my-2 grayscale`}
			>
				<span className="text-[#A6A6A6] font-light flex items-center justify-between">
					<div className="flex items-center">
						<span class="material-symbols-outlined font-light mr-1">
							{icon}
						</span>
						{title}
						{!file.content.includes(suggestion.anchor) && (
							<button className="bg-dim text-white dark:text-black rounded-full p-[2px] flex items-center relative ml-1">
								<div className="icon material-symbols-outlined !text-[20px]">
									error
								</div>
								<div className="absolute tooltip top-10 bg-tertiary p-3 rounded-xl text-black dark:text-white font-normal border-dim border-[0.5px] text-xs min-w-[15vw]">
									Graphite couldn&apos;t find the target text in your writing.
									Graphite may have made a mistake, or your text may have
									changed.
								</div>
							</button>
						)}
					</div>
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
						Reconsider
					</button>
				</span>
			</div>
		);
	}

	if (suggestion.accepted) {
		return (
			<div
				className={`bg-[#F2F6FC] dark:bg-[#27292b] rounded-xl flex flex-col p-3 gap-3 my-2`}
			>
				<span className="text-dim font-light flex items-center">
					<span class="material-symbols-outlined font-light mr-1">{icon}</span>
					{title}
					<span className="bg-primary text-white dark:text-black rounded-full  px-2 ml-2">
						Accepted
					</span>
				</span>
				<span className="text-left font-semibold">{children}</span>
			</div>
		);
	}

	if (!file.content.includes(suggestion.anchor)) {
		return (
			<div
				className={`bg-tertiary rounded-xl flex flex-col p-3 gap-3 my-2 grayscale`}
			>
				<span className="text-dim font-light flex items-center">
					<span class="material-symbols-outlined font-light mr-1">{icon}</span>
					{title}
				</span>
				<span className="text-left font-semibold ml-1">{children}</span>
				<div className="text-left text-sm ml-1">
					<Markdown remarkPlugins={[remarkGfm]}>{explanation}</Markdown>
				</div>
				<div className="flex items-center">
					<button className="bg-dim text-white dark:text-black rounded-full py-1 px-3 flex items-center relative">
						Invalid Suggestion
						<div className="icon material-symbols-outlined ml-1">help</div>
						<div className="absolute tooltip top-10 left-0 bg-tertiary p-3 rounded-xl text-black dark:text-white font-normal border-dim border-[0.5px] text-xs min-w-[20vw] z-50">
							Graphite couldn&apos;t find the target text in your writing.
							Graphite may have made a mistake, or your text may have changed.
						</div>
					</button>
					<button
						className="text-dim ml-4"
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

	return (
		<div
			className={`bg-tertiary rounded-xl flex flex-col p-3 gap-3 my-2`}
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
			<span className="text-dim font-light flex items-center">
				<span class="material-symbols-outlined font-light mr-1">{icon}</span>
				{title}
			</span>
			<span className="text-left font-semibold ml-1">{children}</span>
			<div className="text-left text-sm ml-1">
				<Markdown remarkPlugins={[remarkGfm]}>{explanation}</Markdown>
			</div>
			<div>
				<button
					className="bg-primary hover:bg-primary-hover active:bg-primary-active transition-colors text-white dark:text-black rounded-full py-1 px-3"
					onClick={() => {
						setFile((f) => {
							let file = structuredClone(f);

							for (let toolCall of file.toolHistory) {
								if (toolCall.toolCallId === id) {
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
						setPreviewSuggestion({});
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
						key={i}
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
