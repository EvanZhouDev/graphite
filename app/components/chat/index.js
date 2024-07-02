import EmptyView from "./emptyView";
import Input from "./input";

export default function Chat() {
	return (
		<>
			<div className="flex flex-col justify-stretch h-full">
				<EmptyView />
				<Input />
			</div>
		</>
	);
}
