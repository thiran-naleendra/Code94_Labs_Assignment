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

