"use client";

import { createContext, useState } from "react";

export const PreviewSuggestionContext = createContext();

export function PreviewSuggestionProvider({ children }) {
	const [previewSuggestion, setPreviewSuggestion] = useState({});

	return (
		<PreviewSuggestionContext.Provider
			value={[previewSuggestion, setPreviewSuggestion]}
		>
			{children}
		</PreviewSuggestionContext.Provider>
	);
}
