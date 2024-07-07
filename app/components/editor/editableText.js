import { useContext } from "react";
import { FileContext } from "@/providers/file.js";
import React, { useState } from "react";

const EditableText = () => {
	let { file, setTitle } = useContext(FileContext);
	const [isEditing, setIsEditing] = useState(false);

	const handleClick = () => {
		setIsEditing(true);
	};

	const handleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleBlur = () => {
		setIsEditing(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault(); // Prevent the default action to avoid form submission or other unwanted behavior
			setIsEditing(false);
		}
	};

	return (
		<div className={isEditing ? "" : "my-1 ml-2"}>
			{isEditing ? (
				<input
					className="text-xl font-medium focus:outline-none focus:bg-surface-container rounded-xl px-2 py-1"
					value={file.title}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					autoFocus
				/>
			) : (
				<span className="text-xl font-[500]" onClick={handleClick}>
					{file.title}
				</span>
			)}
		</div>
	);
};

export default EditableText;
