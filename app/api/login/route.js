import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Static credentials (for simplicity, stored in the code)
const VALID_EMAIL = "admin@admin.com";
const VALID_PASSWORD = "admin123";

// Secret for JWT (if using tokens)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// POST: Handle Login
export async function POST(req) {
  const { email, password } = await req.json();

  // Check if email and password match the valid credentials
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    // Optional: Create a JWT token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({
      message: "Login successful",
      token, // Include token if needed for future requests
    });
  } else {
    // Unauthorized response if credentials are incorrect
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
}
