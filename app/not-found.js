import Link from "next/link";

export default function NotFound() {
	return (
		<div className="rounded-xl bg-surface w-full h-full flex justify-stretch flex-col overflow-y-auto transparent-scrollbar items-center">
			<div className="w-full h-full flex items-center justify-center flex-col">
				<span className="material-symbols-outlined text-dim !text-[150px] mb-5">
					not_listed_location
				</span>
				<div className="text-3xl font-medium">Page Not Found</div>
				<div className="text-dim text-center my-3 w-[50vw]">
					Uh oh! The page you are looking for doesn&apos;t exist.
					<br />
					Let&apos;s get you back to writing.
				</div>
				<div className="flex flex-row gap-3 mt-5">
					<Link href="/" className="bg-primary p-3 text-white dark:text-black font-medium text-lg rounded-full px-4 hover:bg-primary-hover active:bg-primary-active transition-colors">
						Go to Editor
					</Link>
				</div>
				<div className="text-dim/70 text-center my-3 w-[50vw] text-sm">
					Error 404
				</div>
			</div>
		</div>
	);
}
