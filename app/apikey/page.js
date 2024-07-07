"use client";

import Image from "next/image";
import { useContext } from "react";
import { FileContext } from "@/providers/file";

export default function APIKey() {
	let { storage, setStorage } = useContext(FileContext);
	return (
		<div className="rounded-xl bg-surface w-full h-full flex justify-center items-center flex-col overflow-y-scroll transparent-scrollbar">
			<Image
				src="/graphite.png"
				width="100"
				height="100"
				priority
				className="w-[13vh]"
				alt="Graphite Logo"
			/>
			<input
				value={storage.apiKey}
				onChange={(e) => {
					setStorage((s) => {
						let storage = structuredClone(s);
						return {
							...storage,
							apiKey: e.target.value,
						};
					});
				}}
			/>
		</div>
	);
}
