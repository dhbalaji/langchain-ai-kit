import { Ollama } from "@langchain/ollama";
import { jsonSchema, streamText } from "ai";
import { ollama } from 'ollama-ai-provider';

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();

  if (!process.env.MODEL) {
    console.log("MODEL environment variable is not set");
  }

  const modelName = process.env.MODEL || "llama3.2";

  const result = streamText({
    model: ollama(modelName),
    messages,
    system,
    tools: Object.fromEntries(
      Object.entries<{ parameters: unknown }>(tools).map(([name, tool]) => [
        name,
        {
          parameters: jsonSchema(tool.parameters!),
        },
      ])
    ),
  });

  return result.toDataStreamResponse();
}
