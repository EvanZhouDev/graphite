import { useContext } from "react";
import { FileContext } from "@/providers/file.js";
import EditorBody from "./editorBody";
import EditableText from "./editableText";

export default function Editor() {
	let { file } = useContext(FileContext);

	return (
		<div className="flex flex-col justify-stretch h-full">
			<div className="flex p-3 pb-0 justify-between">
				<div className="flex flex-row items-center">
					<EditableText />
					<span className="text-dim ml-3 flex items-center">
						<span className="text-[20px] material-symbols-outlined mr-1">
							sync_saved_locally
						</span>
						Saved Locally
					</span>
				</div>
				<div className="flex items-center mr-2">
					<button
						className="material-symbols-outlined text-dim"
						onClick={() => {
							navigator.clipboard.writeText(file.content);
						}}
					>
						file_copy
					</button>
				</div>
			</div>
			<div className="flex-grow">
				<EditorBody />
			</div>
		</div>
	);
}
