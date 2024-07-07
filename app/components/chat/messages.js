import Image from "next/image";

import MemoryTools from "./memoryTools";
import SuggestionTools from "./suggestionTools";

import { useContext, useRef, useEffect } from "react";
import { FileContext } from "@/providers/file";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MessageHeader({ icon, title }) {
	return (
		<span className="flex items-center mb-3">
			{icon}
			<span className="pl-2 text-[17px] font-medium">{title}</span>
		</span>
	);
}

function UserMessage({ text }) {
	return <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>;
}

function GraphiteMessage({ text, tools, active, isLoading }) {
	return (
		<>
			<Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
			{tools?.map((toolInvocation, i) => {
				if (toolInvocation.toolName === "setMemory") {
					return (
						<>
							<MemoryTools tool={tools[i]} active={active} />
						</>
					);
				}
				if (toolInvocation.toolName === "giveSuggestions") {
					return <SuggestionTools tool={tools[i]} />;
				}
			})}
		</>
	);
}

export default function Messages({ isLoading }) {
	let {
		file: { messages, toolHistory },
	} = useContext(FileContext);

	let toolCallCounter = 0;

	const messagesEndRef = useRef(null);

	useEffect(() => {
		messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
	}, [messages.at(-1).content]);

	return (
		<div
			className="flex-grow p-2 overflow-y-auto mb-3 transparent-scrollbar scroll-fadeout-no-scrollbar"
			ref={messagesEndRef}
		>
			{messages.map((message, i) => {
				if (message.role === "user") {
					return (
						<div className="m-2 mb-5">
							<MessageHeader
								icon={
									<span class="material-symbols-outlined text-xl w-7 h-7 outline outline-[#EDEDED] outline-[1px] flex items-center justify-center rounded-full p-1">
										person
									</span>
								}
								title="You"
							/>
							<UserMessage key={i} text={message.content} />
						</div>
					);
				} else if (message.role == "assistant") {
					return (
						<div className="m-2 mb-5">
							<MessageHeader
								icon={
									<Image
										src="/graphite.png"
										width="100"
										height="100"
										className="w-7 p-[2px]"
										priority
									/>
								}
								title="Graphite"
								isLoading={isLoading && i === messages.length - 1}
							/>
							<GraphiteMessage
								key={i}
								text={message.content}
								tools={toolHistory.slice(
									toolCallCounter,
									(toolCallCounter += !message.toolInvocations
										? 0
										: message.toolInvocations.length)
								)}
								active={i === messages.length - 1}
							/>
						</div>
					);
				}
			})}
			{messages.at(-1).role === "assistant" ||
				(isLoading && (
					<>
						<div className="m-2 mb-5">
							<MessageHeader
								icon={
									<Image
										src="/graphite.png"
										width="100"
										height="100"
										className="w-7 p-[2px]"
										priority
									/>
								}
								title="Graphite"
								isLoading
							/>
						</div>
					</>
				))}
			<div
				className={`dot-flashing ml-[22px] ${
					isLoading ? "opacity-100" : "opacity-0"
				} mb-4`}
			/>
		</div>
	);
}
