"use client";
import FileList from "./fileList";
import { FileProvider } from "@/providers/file";
import ClientOnly from "@/components/clientOnly.js";

export default function Library() {
	return (
		<ClientOnly>
			<FileProvider>
				<FileList />
			</FileProvider>
		</ClientOnly>
	);
}
