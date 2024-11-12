import { NextResponse } from "next/server";
import connectToDatabase from '../../lib/connect-db';
import Joke from '../../../models/joke';
import { authMiddleware } from "../../lib/authMiddleware";

// Apply authentication middleware
export async function middleware(req) {
  const authResult = authMiddleware(req);
  if (authResult) return authResult;
  return NextResponse.next();
}

// GET: Fetch all unmoderated jokes
// export async function GET(req) {
//   await connectToDatabase();

//   try {
//     const jokes = await Joke.find({ status: "unmoderated" });
//     return NextResponse.json(jokes);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch unmoderated jokes" }, { status: 500 });
//   }
// }


// // PUT: Edit and approve a joke
// export async function PUT(req) {
//   await connectToDatabase();

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   const action = searchParams.get("action");

//   if (!id || !action) {
//     return NextResponse.json({ error: "Joke ID and action are required" }, { status: 400 });
//   }

//   try {
//     const body = await req.json();
//     let updatedJoke;

//     if (action === "approve") {
//       // Approve the joke and update it
//       const updateData = { status: "approved" };
//       if (body.type) updateData.type = body.type; // Update type if provided
//       updatedJoke = await Joke.findByIdAndUpdate(id, updateData, { new: true });
//     } else if (action === "edit") {
//       // Edit joke content and type
//       updatedJoke = await Joke.findByIdAndUpdate(id, body, { new: true });
//     } else {
//       return NextResponse.json({ error: "Invalid action specified" }, { status: 400 });
//     }

//     if (!updatedJoke) {
//       return NextResponse.json({ message: "Joke not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Joke updated successfully", joke: updatedJoke });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to update joke" }, { status: 500 });
//   }
// }

// DELETE: Reject (delete) a joke by ID
// export async function DELETE(req) {
//   await connectToDatabase();

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   const action = searchParams.get("action");

//   if (!id || action !== "reject") {
//     return NextResponse.json({ error: "Joke ID and action 'reject' are required" }, { status: 400 });
//   }

//   try {
//     const deletedJoke = await Joke.findByIdAndDelete(id);

//     if (!deletedJoke) {
//       return NextResponse.json({ message: "Joke not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Joke deleted successfully" });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to delete joke" }, { status: 500 });
//   }
// }

