import React, { useState } from "react";

export default function AddButton({ onSubmit }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const handleButtonClick = () => {
		if (isExpanded) {
			if (inputValue) onSubmit(inputValue);
			setIsExpanded(false);
			setInputValue("");
		} else {
			setIsExpanded(true);
		}
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleInputKeyDown = (e) => {
		if (e.key === "Enter") {
			if (inputValue) onSubmit(inputValue);
			setIsExpanded(false);
			setInputValue("");
		} else if (e.key === " ") {
			e.stopPropagation();
		}
	};

	const handleInputBlur = () => {
		setTimeout(() => {
			setIsExpanded(false);
			setInputValue("");
		}, 200);
	};

	return (
		<div
			className={`bg-tertiary p-2 rounded-xl font-medium m-1 flex items-center justify-center cursor-pointer`}
			onClick={handleButtonClick}
		>
			<span className="material-symbols-outlined text-[20px]">add</span>
			{isExpanded && (
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
					onBlur={handleInputBlur}
					className="ml-1 bg-transparent focus:outline-none"
					autoFocus
				/>
			)}
		</div>
	);
}
