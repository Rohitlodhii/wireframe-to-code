import { getModelId } from "@/lib/models";
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { model, prompt } = await req.json();

    const modelName = getModelId(model) || "google/gemini-2.0-pro-exp-02-05:free";

    const completion = await openai.chat.completions.create({
      model: modelName,
      stream: true,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          const text = chunk.choices?.[0]?.delta?.content || "";
          controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
