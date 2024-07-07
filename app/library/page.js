"use client";
import FileList from "./fileList";
import { FileProvider } from "@/providers/file";

export default function Library() {
	return (
		<FileProvider>
			<FileList />
		</FileProvider>
	);
}
