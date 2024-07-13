import { useContext, useState, useRef, useEffect } from "react";
import { FileContext } from "@/providers/file.js";

import FileTile from "./fileTile";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";

export default function FileList() {
	let router = useRouter();
	let { storage, setStorage } = useContext(FileContext);
	const containerRef = useRef(null); // Step 1: Use a ref for the container
	const [invisibleItemsCount, setInvisibleItemsCount] = useState(0);
	const [search, setSearch] = useState("");
	const fuse = new Fuse(storage.files, {
		keys: ["title", "content"],
	});

	const calculateAndSetInvisibleItems = () => {
		if (containerRef.current) {
			let grid = containerRef.current.children; //assumes #grid exists in dom
			let n = 0; // Zero items when grid is empty

			// If the grid has items, we assume the 0th element is in the first row, and begin counting at 1
			if (grid.length > 0) {
				n = 1;

				// While the nth item has the same height as the previous item, count it as an item in the row.
				while (grid[n] && grid[n].offsetTop === grid[n - 1].offsetTop) {
					n++;
				}
			}

			const itemsPerRow = n;
			const totalItems = storage.files.length + 1; // +1 for the "New File" button
			let remainder = (itemsPerRow - (totalItems % itemsPerRow)) % itemsPerRow;
			if (remainder === itemsPerRow) remainder = 0;
			// const invisibleCount = remainder === 0 ? 0 : itemsPerRow - remainder;
			setInvisibleItemsCount(remainder);
		}
	};

	useEffect(() => {
		calculateAndSetInvisibleItems();
		const handleResize = () => {
			calculateAndSetInvisibleItems();
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [storage.files.length]); // You might also want to listen to changes in container width

	return (
		<div className="flex flex-col w-full">
			<div className="w-full flex justify-between flex-row mb-3">
				<div className="flex items-center ml-2 w-[20vw]">
					<h1 className="font-semibold text-3xl">File Library</h1>
				</div>
				<div className="bg-surface-container-hover flex-grow flex justify-stretch items-center z-50 flex-row relative rounded-full w-[40vw] h-12 transition-colors focus-within:bg-surface">
					<span className="material-symbols-outlined text-dim text-2xl ml-3">
						search
					</span>
					<input
						placeholder="Search library..."
						className={`bg-transparent focus:outline-none w-[40vw] h-12 px-4 pl-2`}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="flex items-center w-[20vw] justify-end">
					<h1 className="font-light text-dim mr-2 text-right">
						{storage.files.length} Files Total
						{search.length ? (
							<>
								<br />
								Search Returns {fuse.search(search).length} Files
							</>
						) : null}
					</h1>
				</div>
			</div>
			<div className="rounded-xl bg-surface w-full h-full flex justify-stretch flex-col overflow-y-scroll transparent-scrollbar">
				<div
					ref={containerRef}
					className="p-4 flex grow flex-wrap w-full gap-3 justify-center"
				>
					<button
						className="w-[300px] h-[405px] bg-surface rounded-xl border-dim border-[0.5px] border-dashed flex items-center justify-center flex-col"
						onClick={() => {
							setStorage((storage) => {
								return {
									...storage,
									currentFile: storage.files.length,
									files: [
										...storage.files,
										{
											title: "Untitled File",
											content: "",
											messages: [],
											memory: {
												formality: 0,
												audience: [],
												intent: [],
												summary: "",
											},
											toolHistory: [],
										},
									],
								};
							});
							router.push("/");
						}}
					>
						<span className="text-dim text-2xl mb-2">New File</span>
						<span className="material-symbols-outlined text-dim !text-6xl">
							note_add
						</span>
					</button>
					{(search.length ? fuse.search(search) : storage.files).map(
						(file, idx) => {
							return (
								<FileTile
									key={idx}
									file={search.length ? file.item : file}
									idx={search.length ? file.refIndex : idx}
								/>
							);
						}
					)}
					{Array.from({ length: invisibleItemsCount }, (_, index) => (
						<div key={index} className="w-[300px] h-[405px] invisible"></div>
					))}
				</div>
			</div>
		</div>
	);
}
