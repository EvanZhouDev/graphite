"use client";

import { FileContext } from "./providers/file";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import ClientOnly from "./components/clientOnly";
import { FileProvider } from "./providers/file";

function OnboardingRouter() {
	let { storage } = useContext(FileContext);
	const router = useRouter();

	useEffect(() => {
		if (!storage.apiKey) {
			router.push("/help");
		}
	}, [router]);

	return null;
}

export default function OnboardingRouterWrapper() {
	return (
		<ClientOnly>
			<FileProvider>
				<OnboardingRouter />
			</FileProvider>
		</ClientOnly>
	);
}
