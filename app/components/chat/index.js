import { useChat } from "ai/react";

import EmptyView from "./emptyView";
import Messages from "./messages";
import Input from "./input";
import { useContext, useEffect } from "react";
import { FileContext } from "@/providers/file";
import { CHAT_INITIAL, CHAT_NORMAL } from "../prompts";

export default function Chat() {
	let {
		file,
		setFile,
		setMessages: setFileMessages,
		setToolHistory,
		storage,
	} = useContext(FileContext);

	if (storage.files.length == 0) {
		return (
			<div className="flex flex-col justify-center h-full grayscale pointer-events-none items-center">
				<EmptyView setInput={() => {}} />
				<div className="mb-12 font-medium">
					Create a file to use Graphite Chat.
				</div>
			</div>
		);
	}

	let { memory, content } = file;

	if (storage.apiKey == "" || storage.apiKey == undefined) {
		return (
			<div className="flex flex-col justify-center h-full grayscale pointer-events-none items-center">
				<EmptyView setInput={() => {}} />
				<div className="mb-12 font-medium">
					Set your API Key in the API Key tab to use Graphite Chat.
				</div>
			</div>
		);
	}

	let objectEquals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

	const {
		error,
		messages,
		input,
		setInput,
		setMessages,
		handleSubmit,
		isLoading,
	} = useChat({
		maxToolRoundtrips: 0,
		initialMessages: [...file.messages],
		async onToolCall({ toolCall }) {
			if (toolCall.toolName === "setMemory") {
				setFile((file) => ({
					...file,
					toolHistory: [
						...file.toolHistory,
						{
							...toolCall,
							updateMap: {
								formality: toolCall.args.formality != file.memory.formality,
								intent: !objectEquals(
									toolCall.args.intent.map((x) =>
										x.replaceAll("\\n", "\n").replace(/\\/g, "")
									),
									file.memory.intent
								),
								audience: !objectEquals(
									toolCall.args.audience.map((x) =>
										x.replaceAll("\\n", "\n").replace(/\\/g, "")
									),
									file.memory.audience
								),
								summary: !objectEquals(
									toolCall.args.summary
										.replaceAll("\\n", "\n")
										.replace(/\\/g, ""),
									file.memory.summary
								),
							},
						},
					],
					memory: {
						formality: toolCall.args.formality,
						intent: structuredClone(toolCall.args.intent).map((x) =>
							x.replaceAll("\\n", "\n").replace(/\\/g, "")
						),
						audience: structuredClone(toolCall.args.audience).map((x) =>
							x.replaceAll("\\n", "\n").replace(/\\/g, "")
						),
						summary: toolCall.args.summary
							.replaceAll("\\n", "\n")
							.replace(/\\/g, ""),
					},
				}));
			}
			if (toolCall.toolName === "giveSuggestions") {
				try {
					setToolHistory((history) => {
						let cleanToolCall = structuredClone(toolCall);
						cleanToolCall.args.corrections = cleanToolCall.args.corrections.map(
							(x) => ({
								...x,
								text: x.text.replaceAll("\\n", "\n").replace(/\\/g, ""),
								anchor: x.anchor.replaceAll("\\n", "\n").replace(/\\/g, ""),
							})
						);
						return [...history, cleanToolCall];
					});
				} catch (e) {
					console.log(e);
				}
			}
		},
	});

	useEffect(() => {
		if (messages.length > 0) {
			setFileMessages(messages);
		}
	}, [messages]);

	useEffect(() => {
		if (
			file.toolHistory.length > 0 &&
			file.toolHistory.at(-1).toolName === "setMemory"
		) {
			setToolHistory((x) => {
				let newMemory = structuredClone(x);
				newMemory[newMemory.length - 1].args = {
					...newMemory[newMemory.length - 1].args,
					...memory,
					formality: parseInt(memory.formality),
				};
				return newMemory;
			});
		}
	}, [memory]);

	return (
		<div className="flex flex-col justify-stretch h-full">
			{file.messages.length ? (
				<>
					<Messages isLoading={isLoading} />
				</>
			) : (
				<EmptyView setInput={setInput} />
			)}
			<Input
				value={input}
				onChange={setInput}
				onSubmit={() => {
					// ALWAYS remove ALL system messages before sending a new message to clean up backlog
					setMessages(messages.filter((x) => x.role != "system"));
					if (messages.length === 0) {
						setMessages([
							{
								role: "system",
								content: CHAT_INITIAL(memory, content) + `\n${storage.apiKey}`,
							},
							...messages,
						]);
					} else {
						setMessages([
							...messages,
							{
								role: "system",
								content: CHAT_NORMAL(memory, content) + `\n${storage.apiKey}`,
							},
						]);
					}
					handleSubmit();
				}}
			/>
		</div>
	);
}
