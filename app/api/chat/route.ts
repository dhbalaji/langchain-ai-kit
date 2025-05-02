import { Ollama } from "@langchain/ollama";
import { jsonSchema, streamText } from "ai";
import { ollama } from 'ollama-ai-provider';

export async function POST(req: Request) {
  // try {
  //   const { messages } = await req.json();

  //   const model = new Ollama({
  //     baseUrl: "http://localhost:11434",
  //     model: "llama3.2",
  //     temperature: 0.7,
  //   });

  //   const userInput = messages?.[0]?.content?.[0]?.text ?? "Hello";
  //   const reply = await model.invoke(userInput);
  //   const now = new Date().toISOString();

  //   return new Response(
  //     JSON.stringify({
  //       success: true,
  //       thread: {
  //         id: "thread_" + crypto.randomUUID(),
  //         title: userInput.slice(0, 20) + "...",
  //         createdAt: now,
  //         messages: [
  //           {
  //             id: "msg_" + crypto.randomUUID(),
  //             role: "assistant",
  //             createdAt: now,
  //             content: [
  //               {
  //                 type: "text",
  //                 text: reply,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     }),
  //     {
  //       status: 200,
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  // } catch (error) {
  //   console.error("Error:", error);
  //   return new Response(
  //     JSON.stringify({ success: false, error: error.message }),
  //     {
  //       status: 500,
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  // }

  const { messages, system, tools } = await req.json();

  const model = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama3.2",
    temperature: 0.7,
  });

  // const userInput = messages?.[0]?.content ?? "Hello";

  const userInput = messages?.[0]?.content?.[0]?.text ?? "Hello";
  const reply = await model.invoke(userInput);

  console.log("Reply:", reply);
  
  const result = streamText({
    model: ollama("llama3.2"),
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
