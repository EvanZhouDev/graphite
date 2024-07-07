import TextareaAutosize from "react-textarea-autosize";
import { useState, useRef, useEffect } from "react";
import ToolLabel from "./toolLabel";
import FormalitySlider from "./formalitySlider";
import Tags from "./tags";
import { useContext } from "react";
import { FileContext } from "@/providers/file";

export default function Input({ onChange, value, onSubmit }) {
	let { file, setMemory } = useContext(FileContext);

	const [fullMode, setFullMode] = useState(false);
	const [lines, setLines] = useState(1);
	const [isMounted, setIsMounted] = useState(false);

	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const settingsRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (settingsRef.current && !settingsRef.current.contains(event.target)) {
				setIsSettingsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const textareaRef = useRef(null);
	const divRef = useRef(null);

	let useDidUpdateEffect = (fn, inputs) => {
		const isMountingRef = useRef(false);

		useEffect(() => {
			isMountingRef.current = true;
		}, []);

		useEffect(() => {
			if (!isMountingRef.current) {
				return fn();
			} else {
				isMountingRef.current = false;
			}
		}, inputs);
	};

	const handleResize = () => {
		if (textareaRef.current && divRef.current) {
			const textareaWidth = textareaRef.current.offsetWidth;
			const divWidth = divRef.current.offsetWidth;
			if (divWidth > textareaWidth + 10) {
				setFullMode(true);
			} else {
				setFullMode(false);
			}
		}
	};

	useDidUpdateEffect(() => {
		handleResize();
		setIsMounted(true);
	}, [value]);

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="flex justify-stretch gap-3 m-4 h-16 items-end">
			<div
				className={`bg-primary-container flex-grow flex justify-stretch items-center z-50 flex-col relative focus-within:bg-primary-container-hover transition-colors ${
					fullMode || lines > 1 ? "rounded-3xl" : "rounded-full"
				}`}
			>
				<div className="w-full flex flex-grow">
					<TextareaAutosize
						className={`resize-none bg-transparent focus:outline-none transparent-scrollbar grow m-5 w-full ${
							fullMode ? "mb-0" : ""
						}`}
						maxRows={10}
						rows={1}
						placeholder="Chat with Graphite..."
						onChange={(e) => onChange(e.target.value)}
						onHeightChange={(height, { rowHeight }) =>
							setLines(height / rowHeight)
						}
						value={value}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								onSubmit();
								return false;
							}
						}}
						autoFocus
					/>
					<div ref={divRef} className="absolute whitespace-nowrap invisible">
						{value}
					</div>
				</div>
				<div
					className={`w-full flex flex-grow ${
						fullMode ? "mb-2" : "absolute h-16 bottom-0"
					} items-center pointer-events-none`}
				>
					<span className="grow m-5 mx-4 w-full" ref={textareaRef}></span>
					<div className="relative" ref={settingsRef}>
						<button
							className={`bg-transparent rounded-full flex justify-center items-center mr-2 hover:bg-secondary-container-hover active:bg-secondary transition-colors pointer-events-auto p-3 settings-button ${
								value
									? "send-button-visible"
									: isMounted && "send-button-hidden"
							}`}
							onClick={() => setIsSettingsOpen((so) => !so)}
						>
							<span className="material-symbols-outlined">settings</span>
						</button>
						{isSettingsOpen && (
							<div className="absolute bottom-0 right-0 mr-2 mb-16 w-[32vw] bg-surface p-5 border-[0.5px] rounded-xl shadow-xl border-dim z-50 pointer-events-auto">
								<div>
									<ToolLabel icon="work" label="FORMALITY" />
									<FormalitySlider value={file.memory.formality ?? 0} />
								</div>

								<div>
									<ToolLabel icon="person" label="AUDIENCE" />
									<Tags
										tags={file.memory.audience ?? []}
										attributeName="audience"
									/>
								</div>

								<div>
									<ToolLabel icon="location_on" label="INTENTS" />
									<Tags
										tags={file.memory.intent ?? []}
										attributeName="intent"
									/>
								</div>

								<div className="pointer-events-auto">
									<ToolLabel icon="info" label="SUMMARY" />
									<textarea
										value={file.memory.summary ?? ""}
										onChange={(e) => {
											setMemory((m) => ({ ...m, summary: e.target.value }));
										}}
										className="bg-tertiary p-2 rounded-xl font-medium w-full transparent-scrollbar h-[15vh] resize-none focus:outline-none mt-1"
									></textarea>
								</div>
							</div>
						)}
					</div>
					{value && (
						<button
							className={`bg-transparent rounded-full flex justify-center items-center mr-2 hover:bg-secondary-container-hover active:bg-secondary transition-colors pointer-events-auto p-3 send-button`}
							onClick={onSubmit}
						>
							<span className="material-symbols-outlined">send</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
