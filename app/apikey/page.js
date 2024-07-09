"use client";

import Image from "next/image";
import { useContext } from "react";
import { FileContext } from "@/providers/file";
import ClientOnly from "@/components/clientOnly";
import { FileProvider } from "@/providers/file";

function StepCard({ text, icon, idx }) {
	return (
		<div className="bg-secondary-container h-auto w-[13vw] p-4 flex flex-col items-end rounded-xl basis-[calc(50%-4px)] suggestion-card pb-6">
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

function HelpPageTemplate({
	logo,
	title,
	children,
	subtitle,
	card1,
	card2,
	card3,
	image,
}) {
	return (
		<div className="flex flex-row h-full w-full items-center">
			<div className=" w-2/5 flex flex-col items-center justify-stretch h-full">
				<div className="grow flex flex-col items-center justify-center gap-5">
					<div className="flex flex-row items-center">
						{logo}
						<h1 className="font-medium text-4xl my-3">{title}</h1>
					</div>
					{children}
				</div>
			</div>
			<div className="w-0 border-r-[0.5px] border-r-dim h-[95%]"></div>
			<div className="w-3/5 flex flex-col items-center justify-center">
				<p className="text-center mb-7 text-3xl font-medium">{subtitle}</p>
				<div className="flex flex-row gap-3 w-[80%] justify-between mb-5">
					{card1}
					{card2}
					{card3}
				</div>
				{image}
			</div>
		</div>
	);
}

function APIKeyInterface() {
	let { storage, setStorage } = useContext(FileContext);
	return (
		<div className="rounded-xl bg-surface w-full h-full flex justify-stretch flex-col overflow-y-auto transparent-scrollbar items-center">
			<HelpPageTemplate
				logo={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="28"
						height="28"
						viewBox="0 0 28 28"
						fill="none"
						className="h-[5vh] w-auto mr-2"
					>
						<path
							d="M14 28C14 26.0633 13.6267 24.2433 12.88 22.54C12.1567 20.8367 11.165 19.355 9.905 18.095C8.645 16.835 7.16333 15.8433 5.46 15.12C3.75667 14.3733 1.93667 14 0 14C1.93667 14 3.75667 13.6383 5.46 12.915C7.16333 12.1683 8.645 11.165 9.905 9.905C11.165 8.645 12.1567 7.16333 12.88 5.46C13.6267 3.75667 14 1.93667 14 0C14 1.93667 14.3617 3.75667 15.085 5.46C15.8317 7.16333 16.835 8.645 18.095 9.905C19.355 11.165 20.8367 12.1683 22.54 12.915C24.2433 13.6383 26.0633 14 28 14C26.0633 14 24.2433 14.3733 22.54 15.12C20.8367 15.8433 19.355 16.835 18.095 18.095C16.835 19.355 15.8317 20.8367 15.085 22.54C14.3617 24.2433 14 26.0633 14 28Z"
							fill="url(#paint0_radial_16771_53212)"
						/>
						<defs>
							<radialGradient
								id="paint0_radial_16771_53212"
								cx="0"
								cy="0"
								r="1"
								gradientUnits="userSpaceOnUse"
								gradientTransform="translate(2.77876 11.3795) rotate(18.6832) scale(29.8025 238.737)"
							>
								<stop offset="0.0671246" stop-color="#9168C0" />
								<stop offset="0.342551" stop-color="#5684D1" />
								<stop offset="0.672076" stop-color="#1BA1E3" />
							</radialGradient>
						</defs>
					</svg>
				}
				title={"Gemini API Key"}
				subtitle={"How to Get an API Key"}
				card1={
					<StepCard
						text={
							<div>
								Go to{" "}
								<b>
									<a
										href="https://aistudio.google.com/app/apikey"
										className="underline"
									>
										Google AI Studio&apos;s API Key tab
									</a>
								</b>
							</div>
						}
						icon="language"
						title={"Step 1"}
					/>
				}
				card2={
					<StepCard
						text={
							<div>
								Click on <b>Create API key</b> and follow the steps to copy your
								key.
							</div>
						}
						icon="content_copy"
						title={"Step 2"}
					/>
				}
				card3={
					<StepCard
						text={<div>Paste your key in the textbox on the left.</div>}
						icon="content_paste"
						title={"Step 3"}
					/>
				}
				image={
					<Image
						src="/getAPIkey.png"
						width="986"
						height="700"
						className="w-[80%] border-[1px] border-dim rounded-[2vw]"
						alt="Google AI Studio API Key Button"
						priority
					/>
				}
			>
				<p className="w-[25vw] text-center">
					Graphite is powered by <b>Google Gemini</b>. It requires a free API
					key to access, which you can get from Google AI Studio, as shown on
					the right.
				</p>
				<div className="bg-primary-container-hover flex justify-stretch items-center z-50 flex-row relative rounded-full w-[25vw] h-12 transition-colors focus:bg-primary-container-hover">
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
				<div className="text-dim text-center flex items-center justify-center border-[0.5px] border-dim p-3 rounded-xl px-4 mt-5">
					<span className="material-symbols-outlined text-xl mr-2">
						warning
					</span>
					Please keep this API key safe and private.
				</div>
			</HelpPageTemplate>
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
