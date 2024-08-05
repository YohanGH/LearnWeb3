import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// Function for making an API call with retry logic
async function makeApiCallWithRetry(
  body: { messages: any[] },
  retries = 3,
  backoff = 1000
) {
  for (let i = 0; i < retries; i++) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: body.messages,
      });
      return completion;
    } catch (error) {
      // Check for rate limit or quota errors
      if (
        (error as any).code === "insufficient_quota" ||
        (error as any).response?.status === 429
      ) {
        console.warn("Rate limit reached, retrying...", error);
        await new Promise((resolve) => setTimeout(resolve, backoff * (i + 1)));
      } else {
        throw error; // If it's another error, throw it
      }
    }
  }
  throw new Error("Exceeded retry attempts for the OpenAI API call");
}

export async function POST(req: Request) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();

    // Ensure messages are provided in the request body
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid request: 'messages' field is required." },
        { status: 400 }
      );
    }

    // Use retry logic to call the OpenAI API
    const completion = await makeApiCallWithRetry(body);

    // Extract the assistant's response message
    const theResponse = completion.choices[0].message;

    // Return the response as JSON with a status of 200
    return NextResponse.json({ output: theResponse }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);

    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
