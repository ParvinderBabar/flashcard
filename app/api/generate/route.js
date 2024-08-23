import { NextResponse } from "next/server";
import { CohereClient } from "cohere-ai";

const systemPrompt = 
`You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 12 flashcards.
Both front and back should be one sentence long that can fit in box of 240px width.
You should return in the following format
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}`
;

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export async function POST(req) {
  const data = await req.text();

  const response = await cohere.chat({
    chatHistory: [
      { role: "USER", message: data },
    ],
    message: systemPrompt,
  });

  const responseBody = response.text;
  console.log("Raw response body:", responseBody);

  // Attempt to parse the JSON response
  try {
    const parsedFlashcards = JSON.parse(responseBody);
    return NextResponse.json(parsedFlashcards.flashcards);
  } catch (error) {
    console.error("Failed to parse flashcards:", error);
    return NextResponse.json({ error: "Failed to generate flashcards" });
  }
}