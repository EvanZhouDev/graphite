import { useContext, useState, useRef, useEffect } from "react";
import { FileContext } from "@/providers/file";
import { useRouter } from "next/navigation";

export default function FileTile({ file, idx }) {
	const router = useRouter();
	let { storage, setCurrentFile, setStorage } = useContext(FileContext);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const [isEditing, setIsEditing] = useState(false);

	const toggleDropdown = (e) => {
		e.stopPropagation();
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			className="w-[300px] h-[405px] bg-surface flex flex-col justify-stretch rounded-xl border-dim border-[0.5px] cursor-pointer file-list-container transition-colors"
			onClick={() => {
				setCurrentFile(idx);
				router.push("/");
			}}
		>
			<div className="flex-grow relative">
				<div className="h-[330px] p-3 overflow-hidden scroll-fadeout">
					{file.content}
				</div>
				{idx === storage.currentFile && (
					<div className="bg-primary text-white dark:text-black px-2 py-1 rounded-full text-sm absolute right-0 bottom-0 mr-2 mb-2">
						Current File
					</div>
				)}
			</div>
			<div className="h-[75px] bg-surface-container rounded-b-xl border-t-[0.5px] border-t-dim flex items-center file-list-description justify-between">
				<div className="pl-2">
					<div className="text-lg font-semibold flex">
						{isEditing ? (
							<input
								type="text"
								className="bg-transparent focus:outline-none"
								value={file.title}
								onChange={(e) =>
									setStorage((s) => {
										let storage = structuredClone(s);
										storage.files[idx].title = e.target.value;
										return storage;
									})
								}
								onBlur={() => setIsEditing(false)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										setIsEditing(false);
									}
								}}
								autoFocus
							/>
						) : (
							<div className="file-title" onClick={() => setIsEditing(true)}>
								{file.title}
							</div>
						)}
					</div>
					<div className="text-dim mt-1">
						{file.content === "" ? 0 : file.content.split(" ").length} words
					</div>
				</div>
				<div ref={dropdownRef} className="relative">
					<span
						className="material-symbols-outlined text-dim mr-1 p-1 rounded-full cursor-pointer hover:bg-dim/25"
						onClick={toggleDropdown}
					>
						more_vert
					</span>
					{isDropdownOpen && (
						<div className="absolute right-0 mt-2 w-[185px] bg-primary-container rounded-xl shadow-xl z-50 border-[0.5px] border-dim">
							<button
								href="#"
								className="py-2 text-[15px] hover:bg-primary-container-hover rounded-t-xl font-medium flex items-center px-2 pr-4 w-full"
								onClick={(e) => {
									e.stopPropagation();
									setCurrentFile(idx);
									router.push("/");
								}}
							>
								<span className="material-symbols-outlined text-[20px] pr-2">
									open_in_full
								</span>
								Open in Editor
							</button>
							<button
								href="#"
								className="py-2 text-[15px] hover:bg-primary-container-hover font-medium flex items-center px-2 pr-4 w-full"
								onClick={(e) => {
									e.stopPropagation();
									setIsEditing(true);
									toggleDropdown(e);
								}}
							>
								<span className="material-symbols-outlined text-[20px] pr-2">
									edit
								</span>
								Rename File
							</button>
							<button
								href="#"
								className="py-2 text-[15px] hover:bg-primary-container-hover font-medium flex items-center px-2 pr-4 w-full"
								onClick={(e) => {
									e.stopPropagation();
									setStorage((storage) => {
										return {
											...storage,
											currentFile:
												storage.currentFile === storage.files.length - 1
													? storage.files.length - 2
													: storage.currentFile,
											files: storage.files.filter((_, i) => i !== idx),
										};
									});
									toggleDropdown(e);
								}}
							>
								<span className="material-symbols-outlined text-[20px] pr-2">
									delete
								</span>
								Delete File
							</button>
							<button
								href="#"
								className="py-2 text-[15px] hover:bg-primary-container-hover font-medium flex items-center px-2 pr-4 w-full text-left rounded-b-xl"
								onClick={(e) => {
									e.stopPropagation();
									setCurrentFile(idx);
									toggleDropdown(e);
								}}
							>
								<span className="material-symbols-outlined text-[20px] pr-2">
									check_circle
								</span>
								Mark Current File
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
