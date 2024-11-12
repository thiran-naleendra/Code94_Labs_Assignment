import { NextResponse } from "next/server";
import connectToDatabase from '../../../lib/connect-db';
import Joke from '@/models/joke';

export async function PUT(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Joke ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { type, content, status } = body;

    // Ensure required fields are provided
    if (!type || !content || !status) {
      return NextResponse.json({ error: "Type, content, and status are required" }, { status: 400 });
    }

    const updatedJoke = await Joke.findByIdAndUpdate(
      id,
      { type, content, status },
      { new: true }
    );

    if (!updatedJoke) {
      return NextResponse.json({ error: "Joke not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Joke updated successfully", joke: updatedJoke });
  } catch (error) {
    console.error("Error updating joke:", error);
    return NextResponse.json({ error: "Failed to update joke" }, { status: 500 });
  }
}
