"use client";

import { createContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export const FileContext = createContext();

export function FileProvider({ children }) {
	const [storage, setStorage] = useLocalStorage("graphite", {
		currentFile: 0,
		files: [
			{
				title: "New File",
				content: "",
				messages: [],
				memory: {},
				toolHistory: [],
			},
		],
	});

	let useCurrentFile = (storage, setStorage) => {
		let file = storage.files[storage.currentFile];
		let setFile = (setFileAction) => {
			setStorage((storage) => {
				const newStorage = {
					...storage,
					files: [...storage.files],
				};
				newStorage.files[storage.currentFile] =
					typeof setFileAction === "function"
						? setFileAction(file)
						: setFileAction;
				return newStorage;
			});
		};

		let setAttribute = (attribute) => (setFieldAction) => {
			setStorage((storage) => {
				let newStorage = structuredClone(storage);
				newStorage.files[storage.currentFile][attribute] =
					typeof setFieldAction === "function"
						? setFieldAction(file[attribute])
						: setFieldAction;
				return newStorage;
			});
		};

		let setCurrentFile = (index) => {
			setStorage((storage) => {
				return {
					...storage,
					currentFile: index,
				};
			});
		};

		// ! IMPORTANT: All setAttributes rely on setStorage under the hood, which means calling multiple setAttributes together will ONLY CAUSE 1 TO WORK. If you need to call multiple setAttributes, you should use setFile instead.
		return {
			file,
			setFile,
			setCurrentFile,
			setTitle: setAttribute("title"),
			setContent: setAttribute("content"),
			setMessages: setAttribute("messages"),
			setMemory: setAttribute("memory"),
			setToolHistory: setAttribute("toolHistory"),
		};
	};

	return (
		<FileContext.Provider value={useCurrentFile(storage, setStorage)}>
			{children}
		</FileContext.Provider>
	);
}
