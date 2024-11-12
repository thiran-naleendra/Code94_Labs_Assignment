import { NextResponse } from "next/server";
import connectToDatabase from '../../../lib/connect-db';
import Joke from '@/models/joke';

// DELETE: Reject (delete) a joke by ID
export async function DELETE(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const action = searchParams.get("action");

  if (!id || action !== "reject") {
    return NextResponse.json({ error: "Joke ID and action 'reject' are required" }, { status: 400 });
  }

  try {
    const deletedJoke = await Joke.findByIdAndDelete(id);

    if (!deletedJoke) {
      return NextResponse.json({ message: "Joke not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Joke deleted successfully" });
  } catch (error) {
    console.error("Error deleting joke:", error);
    return NextResponse.json({ error: "Failed to delete joke" }, { status: 500 });
  }
}
