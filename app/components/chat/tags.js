import { FileContext } from "@/providers/file";
import { useContext } from "react";
import AddButton from "./addButton";

export default function Tags({ tags, attributeName }) {
	let { setMemory } = useContext(FileContext);

	return (
		<>
			<div className="flex flex-wrap -ml-1 mb-3">
				{tags.map((tag) => (
					<span className="bg-tertiary p-2 rounded-xl font-medium m-1 flex items-center">
						{tag}
						<button
							className="flex items-center justify-center"
							onClick={() => {
								setMemory((mem) => {
									const index = mem[attributeName].findIndex((t) => t == tag);
									if (index > -1) {
										return {
											...mem,
											[attributeName]: [
												...mem[attributeName].slice(0, index),
												...mem[attributeName].slice(index + 1),
											],
										};
									}
									return mem;
								});
							}}
						>
							<span className="material-symbols-outlined text-[20px] ml-1">
								close
							</span>
						</button>
					</span>
				))}
				<AddButton
					onSubmit={(val) =>
						setMemory((mem) => ({
							...mem,
							[attributeName]: [...mem[attributeName], val],
						}))
					}
				/>
			</div>
		</>
	);
}
