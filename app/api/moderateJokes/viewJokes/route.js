import { NextResponse } from "next/server";
import connectToDatabase from '../../../lib/connect-db';
import Joke from '@/models/joke';


// GET: Fetch all unmoderated jokes
export async function GET(req) {
  await connectToDatabase();

  try {
    const jokes = await Joke.find({ status: { $in: ["unmoderated", "approved"] } });
    return NextResponse.json(jokes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch unmoderated jokes" }, { status: 500 });
  }
}