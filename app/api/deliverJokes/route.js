import { NextResponse } from "next/server";
import connectToDatabase from '../../lib/connect-db';
import Joke from '../../../models/joke';

// GET: Fetch jokes or joke types
export async function GET(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    if (type) {
      // Fetch the latest approved joke of the specified type
      const joke = await Joke.findOne({ type, status: "approved" }).sort({ _id: -1 });
      return NextResponse.json(joke || { message: "No approved joke found for this type" });
    } else {
      // Fetch all approved jokes if no type is specified
      const approvedJokes = await Joke.find({ status: "approved" }).sort({ _id: -1 });
      return NextResponse.json(approvedJokes);
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data from the Deliver Jokes service" }, { status: 500 });
  }
}

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

// PUT: Update a joke by ID
export async function PUT(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Joke ID is required to update a joke" }, { status: 400 });
  }

  try {
    const { type, content, status } = await req.json();
    const updatedJoke = await Joke.findByIdAndUpdate(id, { type, content, status }, { new: true });

    if (!updatedJoke) {
      return NextResponse.json({ message: "Joke not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Joke updated successfully", joke: updatedJoke });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update joke" }, { status: 500 });
  }
}

// DELETE: Remove a joke by ID
export async function DELETE(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Joke ID is required to delete a joke" }, { status: 400 });
  }

  try {
    const deletedJoke = await Joke.findByIdAndDelete(id);

    if (!deletedJoke) {
      return NextResponse.json({ message: "Joke not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Joke deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete joke" }, { status: 500 });
  }
}