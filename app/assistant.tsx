"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";

export const Assistant = () => {
  const runtime = useChatRuntime({
    api: process.env.NEXT_PUBLIC_URL!,
    initialMessages: [
      {
        role: "system",
        content: [
          {
            text: "The response should be short and concise, with a maximum of 100 words.",
            type: "text",
          },
        ],
      },
    ]
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {/* <div className="grid grid-cols-[200px_1fr] gap-x-2 px-4 py-4"  style={{ height: "calc(100dvh - 3.75rem)" }}> */}
        {/* <ThreadList /> */}
        <div style={{ height: "calc(100dvh - 3.75rem)" }}>
        <Thread  />
        </div>
      {/* </div> */}
    </AssistantRuntimeProvider>
  );
};
