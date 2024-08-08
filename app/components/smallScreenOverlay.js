"use client";
import { useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function SmallScreenOverlay() {
	const isSmallDevice = useMediaQuery("only screen and (max-width : 1025px)");
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	return (
		<div
			className={`absolute top-0 left-0 bottom-0 right-0 z-100 bg-white ${
				isSmallDevice ? "visible" : "invisible"
			}`}
		>
			<div className="w-full h-full flex items-center justify-center flex-col">
				<span className="material-symbols-outlined text-dim !text-[150px] mb-5">
					open_in_full
				</span>
				<div className="text-3xl font-medium">Screen Too Small</div>
				<div className="text-dim text-center my-3 w-[50vw]">
					Graphite&nbsp;s AI writing interface is meant to be used on a laptop-sized
					screen or larger. It is not yet optimized for{" "}
					<i>mobile or tablet devices</i>.
				</div>
				<div className="flex flex-row gap-3 mt-5">
					<button
						className="bg-primary p-3 text-white dark:text-black font-medium text-lg rounded-full px-4 hover:bg-primary-hover active:bg-primary-active transition-colors"
						onClick={() => setIsVisible(false)}
					>
						Continue Anyway
					</button>
				</div>
				<div className="text-dim/70 text-center my-3 w-[50vw] text-sm">
					You will see this disclaimer again on reload. If you believe this is a
					mistake, please{" "}
					<a
						href="https://github.com/EvanZhouDev/graphite/issues"
						className="underline"
					>
						report an issue on GitHub
					</a>
					.
				</div>
			</div>
		</div>
	);
}
