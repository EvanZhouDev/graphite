"use client";
import { useIsClient } from "@uidotdev/usehooks";

export default function ClientOnly({ children }) {
	const isClient = useIsClient();

	// Render children if on client side, otherwise return null
	return isClient ? <>{children}</> : null;
}
