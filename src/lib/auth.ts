import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const JWT_SECRET_KEY = process.env.JWT_SECRET;

function getSecret(): Uint8Array {
  const secret = JWT_SECRET_KEY || "skillsha-learn-dev-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

/** Sign a JWT for a user. Expires in 7 days. */
export async function signToken(payload: { id: string; email: string; name: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

/** Verify a JWT from an Authorization header or cookie. Returns the payload or null. */
export async function verifyToken(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const cookieToken = req.cookies.get("skillsha_token")?.value;
    const token = authHeader?.replace("Bearer ", "") || cookieToken;

    if (!token) return null;

    const { payload } = await jwtVerify(token, getSecret());
    return payload as { id: string; email: string; name: string };
  } catch {
    return null;
  }
}
