import { FileProvider } from "@/providers/file";

export const metadata = {
	title: "Graphite API Key",
};

export default function ClientLayout({ children }) {
	return <FileProvider>{children}</FileProvider>;
}
