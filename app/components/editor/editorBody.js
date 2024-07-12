import { useContext, useRef, useEffect } from "react";
import { FileContext } from "@/providers/file.js";
import { PreviewSuggestionContext } from "@/providers/previewSuggestion";

export default function EditorBody() {
	let { file, setContent } = useContext(FileContext);
	let [previewSuggestion] = useContext(PreviewSuggestionContext);
	const markRef = useRef(null);

	useEffect(() => {
		if (markRef.current) {
			markRef.current.scrollIntoView();
		}
	}, [previewSuggestion]);

	function renderTextWithHighlight(mainText, activeChange) {
		const anchorPosition = mainText.indexOf(activeChange.anchor);

		if (activeChange.type === "add_before" && anchorPosition !== -1) {
			const beforeAnchor = mainText.substring(0, anchorPosition);
			const afterAnchor = mainText.substring(anchorPosition);

			// Inserting the added text before the anchor point and highlighting it
			return (
				<>
					{beforeAnchor}
					<mark
						className="bg-secondary text-primary dark:text-primary-active p-1 rounded font-medium whitespace-pre-line"
						ref={markRef}
					>
						{activeChange.text}
					</mark>
					{afterAnchor}
				</>
			);
		} else if (activeChange.type === "add_after" && anchorPosition !== -1) {
			const beforeAnchor = mainText.substring(
				0,
				anchorPosition +
					activeChange.anchor.replaceAll("\\n", "").replace(/\\/g, "").length
			);
			const afterAnchor = mainText.substring(
				anchorPosition +
					activeChange.anchor.replaceAll("\\n", "\n").replace(/\\/g, "").length
			);

			// Inserting the added text after the anchor point and highlighting it
			return (
				<>
					{beforeAnchor}
					<mark
						className="bg-[#D3E2FD] text-[#0957D0] p-1 rounded font-medium whitespace-pre-line"
						ref={markRef}
					>
						{activeChange.text.replaceAll("\\n", "").replace(/\\/g, "")}
					</mark>
					{afterAnchor}
				</>
			);
		} else if (activeChange.type === "remove" && anchorPosition !== -1) {
			const beforeAnchor = mainText.substring(0, anchorPosition);
			const afterAnchor = mainText.substring(
				anchorPosition +
					activeChange.anchor.replaceAll("\\n", "\n").replace(/\\/g, "").length
			);

			// Returning the text with the anchor removed
			return (
				<>
					{beforeAnchor}
					<mark
						className="bg-[#ebebeb] p-1 rounded font-medium whitespace-pre-line"
						ref={markRef}
					>
						<s className="text-[#A6A6A6] whitespace-pre-line">
							{activeChange.anchor.replaceAll("\\n", "\n").replace(/\\/g, "")}
						</s>
					</mark>
					{afterAnchor}
				</>
			);
		}
		// Handling the 'replace' operation
		else if (activeChange.type === "replace" && anchorPosition !== -1) {
			const beforeAnchor = mainText.substring(0, anchorPosition);
			const afterAnchor = mainText.substring(
				anchorPosition + activeChange.anchor.length
			);

			// Replacing the anchor with the new text and highlighting it
			return (
				<>
					{beforeAnchor}
					<s className="text-[#A6A6A6] font-medium whitespace-pre-line">
						{activeChange.anchor.replaceAll("\\n", "").replace(/\\/g, "")}
					</s>{" "}
					<mark
						ref={markRef}
						className="bg-[#D3E2FD] text-[#0957D0] p-1 rounded font-medium whitespace-pre-line"
					>
						{activeChange.text.replaceAll("\\n", "").replace(/\\/g, "")}
					</mark>
					{afterAnchor}
				</>
			);
		}

		// If the type is not 'add_before' or anchor not found, return the main text without changes
		return mainText;
	}

	return (
		<div className="relative w-full h-full">
			<textarea
				className="w-full h-full resize-none rounded-xl focus:outline-none p-3 text-[18px] px-5 transparent-scrollbar bg-transparent"
				value={file.content}
				onChange={(e) => {
					setContent(e.target.value);
				}}
				placeholder="Start writing here..."
			/>
			{previewSuggestion.type && (
				<div
					className="w-full h-full resize-none rounded-xl focus:outline-none p-3 px-5 absolute top-0 left-0 overflow-y-auto pointer-events-none z-50 bg-surface text-[18px] transparent-scrollbar"
					style={{
						whiteSpace: "pre-wrap",
						wordWrap: "break-word",
					}}
				>
					{renderTextWithHighlight(file.content, previewSuggestion)}
				</div>
			)}
		</div>
	);
}
