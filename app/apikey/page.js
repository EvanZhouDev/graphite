"use client";

import Image from "next/image";
import { useContext } from "react";
import { FileContext } from "@/providers/file";
import ClientOnly from "@/components/clientOnly";
import { FileProvider } from "@/providers/file";

function StepCard({ text, icon, onClick, idx }) {
	return (
		<div className="bg-secondary-container h-auto w-[15vw] p-4 flex flex-col items-end rounded-xl basis-[calc(50%-4px)] suggestion-card pb-6">
			<div className="flex flex-row items-center justify-between w-full">
				<span className="text-xl font-semibold">Step {idx}</span>
				<div className="material-symbols-outlined bg-surface p-3 rounded-full">
					{icon}
				</div>
			</div>
			<span className="text-left w-full mt-3">{text}</span>
		</div>
	);
}

function APIKeyInterface() {
	let { storage, setStorage } = useContext(FileContext);
	return (
		<div className="rounded-xl bg-surface w-full h-full flex justify-center items-center flex-col overflow-y-scroll transparent-scrollbar">
			<Image
				src="/graphite.png"
				width="100"
				height="100"
				className="w-[11vh]"
				alt="Graphite Logo"
				priority
			/>
			<h1 className="font-medium text-4xl my-3 mt-5">Gemini API Key</h1>
			<p className="text-dim w-[25vw] text-center mb-5">
				Graphite is powered under-the-hood by Gemini. Please enter your Gemini
				API Key below:
			</p>
			<div className="bg-primary-container-hover flex justify-stretch items-center z-50 flex-row relative rounded-full w-[40vw] h-12 transition-colors focus:bg-primary-container-hover">
				<span className="material-symbols-outlined text-dim text-2xl ml-3">
					key
				</span>
				<input
					type="password"
					placeholder="Gemini API Key..."
					className={`bg-transparent focus:outline-none w-[40vw] h-12 px-4 pl-2`}
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
			<p className="text-center mb-5 text-xl font-medium mt-7">
				How to Get an API Key
			</p>
			<p className="text-dim text-center mb-5">
				Follow these simple steps to get a free API key from Google Makersuite.
			</p>
			<div className="flex flex-row gap-3">
				<StepCard
					text={
						<div>
							Go to{" "}
							<b>
								<a
									href="https://aistudio.google.com/app/apikey"
									className="underline"
								>
									Google AI Studio's API Key tab
								</a>
							</b>
						</div>
					}
					icon="language"
					idx={1}
				/>
				<StepCard
					text={
						<div>
							Click on <b>Create API key</b> and follow the steps to copy your
							key.
						</div>
					}
					icon="content_copy"
					idx={2}
				/>
				<StepCard
					text={<div>Paste your key in the textbox below.</div>}
					icon="content_paste"
					idx={3}
				/>
			</div>
			<div className="text-dim text-center mb-5 flex items-center justify-center mt-6 border-[0.5px] border-dim p-3 rounded-xl px-4">
				<span className="material-symbols-outlined text-xl mr-2">warning</span>
				Please keep this API key safe and private. Graphite only sends this key
				to Google.
			</div>
		</div>
	);
}

export default function APIKey() {
	return (
		<ClientOnly>
			<FileProvider>
				<APIKeyInterface />
			</FileProvider>
		</ClientOnly>
	);
}
