import TextareaAutosize from "react-textarea-autosize";
import { useState, useRef, useEffect } from "react";

export default function Input() {
	const [content, setContent] = useState("");
	const [fullMode, setFullMode] = useState(false);
	const [lines, setLines] = useState(1);
	const [isMounted, setIsMounted] = useState(false);

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
	}, [content]);

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="flex justify-stretch gap-3 m-4 h-16 items-end">
			<div
				className={`bg-primary-container flex-grow flex justify-stretch items-center z-50 flex-col relative ${
					fullMode || lines > 1 ? "rounded-3xl" : "rounded-full"
				}`}
			>
				<div className="w-full flex flex-grow">
					<TextareaAutosize
						className={`resize-none bg-transparent focus:outline-none transparent-scrollbar grow m-5 mx-4 w-full ${
							fullMode ? "mb-0" : ""
						}`}
						maxRows={10}
						rows={1}
						placeholder="Chat with Graphite..."
						onChange={(e) => setContent(e.target.value)}
						onHeightChange={(height, { rowHeight }) =>
							setLines(height / rowHeight)
						}
						value={content}
						autoFocus
					/>
					<div ref={divRef} className="absolute whitespace-nowrap invisible">
						{content}
					</div>
				</div>
				<div
					className={`w-full flex flex-grow ${
						fullMode ? "mb-2" : "absolute h-16 bottom-0"
					} items-center pointer-events-none`}
				>
					<span className="grow m-5 mx-4 w-full" ref={textareaRef}></span>
					<button
						className={`bg-transparent rounded-full flex justify-center items-center mr-1 hover:bg-secondary-container-hover active:bg-secondary transition-colors pointer-events-auto p-3 settings-button ${
							content
								? "send-button-visible"
								: isMounted && "send-button-hidden"
						}`}
					>
						<span className="material-symbols-outlined">settings</span>
					</button>
					{content && (
						<button
							className={`bg-transparent rounded-full flex justify-center items-center mr-2 hover:bg-secondary-container-hover active:bg-secondary transition-colors pointer-events-auto p-3 send-button`}
						>
							<span className="material-symbols-outlined">send</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
