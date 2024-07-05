"use client";

import Chat from "@/components/chat";
import Editor from "@/components/editor";
import { FileProvider } from "./providers/file.js";
import { PreviewSuggestionProvider } from "./providers/previewSuggestion.js";
import Sidebar from "./components/sidebar/";

import React from "react";
import { useIsClient } from "@uidotdev/usehooks";

export const ClientOnly = ({ children }) => {
	const isClient = useIsClient();

	// Render children if on client side, otherwise return null
	return isClient ? <>{children}</> : null;
};

export default function Home() {
	return (
		<div className="bg-surface-container flex w-screen h-screen gap-3 p-3">
			<Sidebar />
			<PreviewSuggestionProvider>
				<div className="basis-2/3 rounded-xl bg-surface">
					<ClientOnly>
						<FileProvider>
							<Editor />
						</FileProvider>
					</ClientOnly>
				</div>
				<div className="basis-1/3 rounded-xl bg-surface">
					<ClientOnly>
						<FileProvider>
							<Chat />
						</FileProvider>
					</ClientOnly>
				</div>
			</PreviewSuggestionProvider>
		</div>
	);
}
