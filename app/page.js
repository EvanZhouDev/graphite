"use client";

import Chat from "@/components/chat";

export default function Home() {
	return (
		<div className="bg-surface-container flex w-screen h-screen gap-3 p-3">
			<div className="basis-2/3 rounded-xl bg-surface"></div>
			<div className="basis-1/3 rounded-xl bg-surface">
				<Chat />
			</div>
		</div>
	);
}
