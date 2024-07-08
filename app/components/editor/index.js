import { useContext } from "react";
import { FileContext } from "@/providers/file.js";
import EditorBody from "./editorBody";
import EditableText from "./editableText";
import { useRouter } from "next/navigation";

export default function Editor() {
	let router = useRouter();
	let { file, storage, setStorage } = useContext(FileContext);

	return (
		<div className="flex flex-col justify-stretch h-full">
			{storage.files.length === 0 ? (
				<div className="w-full h-full flex items-center justify-center flex-col">
					<span class="material-symbols-outlined text-dim text-[150px] mb-5">
						indeterminate_question_box
					</span>
					<div className="text-3xl font-medium">No Files to Edit</div>
					<div className="text-dim text-center my-3">
						Create a new file with the button below,
						<br />
						or go to the library to create a file.
					</div>
					<div className="flex flex-row gap-3 mt-5">
						<button
							className="bg-primary p-3 text-white dark:text-black font-medium text-lg rounded-full px-4 hover:bg-primary-hover active:bg-primary-active transition-colors"
							onClick={() => {
								setStorage((storage) => {
									return {
										currentFile: storage.files.length,
										files: [
											...storage.files,
											{
												title: "Untitled File",
												content: "",
												messages: [],
												memory: {
													formality: 0,
													audience: [],
													intent: [],
													summary: "",
												},
												toolHistory: [],
											},
										],
									};
								});
							}}
						>
							Create New File
						</button>
						<button
							className="border-[1px] border-primary p-3 text-primary font-medium text-lg rounded-full px-4 hover:bg-surface-container active:bg-surface-container-hover transition-colors"
							onClick={() => {
								router.push("/library");
							}}
						>
							Go to Library
						</button>
					</div>
				</div>
			) : (
				<>
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
				</>
			)}
		</div>
	);
}
