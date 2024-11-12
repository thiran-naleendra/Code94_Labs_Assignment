import { NextResponse } from "next/server";
import connectToDatabase from '../../lib/connect-db';
import Joke from '../../../models/joke';
// POST: Add a new joke
export async function POST(req) {
  await connectToDatabase();

  try {
    const { type, content, status = "unmoderated" } = await req.json();

    const newJoke = new Joke({
      type,
      content,
      status,
    });
    await newJoke.save();

    return NextResponse.json({ message: "Joke added successfully", joke: newJoke }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add joke" }, { status: 500 });
  }
}
