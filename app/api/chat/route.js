import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";
import { z } from "zod";
import {
	MEMORY_TOOLCALL,
	SUGGESTION_TOOLCALL,
	MEMORY_AND_SUGGESTION_TOOLCALL,
} from "@/components/prompts";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
	const { messages, customKey } = await req.json();

	process.env.GOOGLE_GENERATIVE_AI_API_KEY = customKey;

	const result = await streamText({
		model: google("models/gemini-1.5-pro-latest", {
			safetySettings: [
				{
					category: "HARM_CATEGORY_HATE_SPEECH",
					threshold: "BLOCK_ONLY_HIGH",
				},
				{
					category: "HARM_CATEGORY_DANGEROUS_CONTENT",
					threshold: "BLOCK_ONLY_HIGH",
				},
				{
					category: "HARM_CATEGORY_HARASSMENT",
					threshold: "BLOCK_ONLY_HIGH",
				},
				{
					category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
					threshold: "BLOCK_ONLY_HIGH",
				},
			],
		}),
		messages: messages.flatMap((x) => {
			if (x.role === "system")
				return {
					role: "system",
					content: x.content,
				};
			return convertToCoreMessages([x]);
		}),
		tools: {
			setMemory: {
				description: MEMORY_TOOLCALL(),
				parameters: z.object({
					formality: z
						.number()
						.describe(
							"An integer from 1 to 5 describing HOW FORMAL the text should be. Where 1 is EXTREMELY INFORMAL (text message) and 5 is EXTREMELY FORMAL (legal document)"
						),
					summary: z
						.string()
						.describe(
							"A string that SUMMARIZES what the writer wants to write. You always refer to what is being written as 'the text'. INCLUDE EVERY DETAIL about the text."
						),
					audience: z
						.array(z.string())
						.describe(
							"An array of strings for ALL POSSIBLE target audiences of the text. INCLUDE any SPECIFIC DETAILS the writer may have about the audience."
						),
					intent: z
						.array(z.string())
						.describe(
							"An array of strings for ALL POSSIBLE intentions of the text. INCLUDE any SPECIFIC DETAILS the writer may have about their intentions."
						),
				}),
			},
			giveSuggestions: {
				description: SUGGESTION_TOOLCALL(),
				parameters: z.object({
					corrections: z.array(
						z.object({
							actionType: z.string(),
							anchor: z
								.string()
								.describe(
									"Text that MUST come from a codeblock, or an empty string if you want to add at the beginning or end of the text"
								),
							text: z.string(),
							explanation: z.string(),
						})
					),
				}),
			},
			setMemoryAndGiveSuggestions: {
				description: MEMORY_AND_SUGGESTION_TOOLCALL(),
				parameters: z.object({
					formality: z
						.number()
						.describe(
							"An integer from 1 to 5 describing HOW FORMAL the text should be. Where 1 is EXTREMELY INFORMAL (text message) and 5 is EXTREMELY FORMAL (legal document)"
						),
					summary: z
						.string()
						.describe(
							"A string that SUMMARIZES what the writer wants to write. You always refer to what is being written as 'the text'. INCLUDE EVERY DETAIL about the text."
						),
					audience: z
						.array(z.string())
						.describe(
							"An array of strings for ALL POSSIBLE target audiences of the text. INCLUDE any SPECIFIC DETAILS the writer may have about the audience."
						),
					intent: z
						.array(z.string())
						.describe(
							"An array of strings for ALL POSSIBLE intentions of the text. INCLUDE any SPECIFIC DETAILS the writer may have about their intentions."
						),
					corrections: z.array(
						z.object({
							actionType: z.string(),
							anchor: z
								.string()
								.describe(
									"Text that MUST come from a codeblock, or an empty string if you want to add at the beginning or end of the text"
								),
							text: z.string(),
							explanation: z.string(),
						})
					),
				}),
			},
		},
	});

	return result.toAIStreamResponse();
}
