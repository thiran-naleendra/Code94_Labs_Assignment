import { NextResponse } from "next/server";
import connectToDatabase from '../../../lib/connect-db';
import Joke from '@/models/joke';

export async function POST(req) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { type, content, status = "unmoderated" } = body;

    // Ensure required fields are provided
    if (!type || !content) {
      return NextResponse.json({ error: "Type and content are required" }, { status: 400 });
    }

    // Create a new joke document
    const newJoke = new Joke({
      type,
      content,
      status,
    });

    // Save the new joke to the database
    await newJoke.save();

    return NextResponse.json({ message: "Joke added successfully", joke: newJoke }, { status: 201 });
  } catch (error) {
    console.error("Error adding joke:", error);
    return NextResponse.json({ error: "Failed to add joke" }, { status: 500 });
  }
}
