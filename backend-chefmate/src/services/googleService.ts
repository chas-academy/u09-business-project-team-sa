import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

if (!CLIENT_ID) {
  throw new Error("Missing GOOGLE_CLIENT_ID in environment variables");
}

const client = new OAuth2Client(CLIENT_ID);

export interface GoogleUserPayload {
  email: string;
  name: string;
  picture?: string;
  sub: string;
}

export async function verifyGoogleToken(
  idToken: string
): Promise<GoogleUserPayload> {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token");
  }

  return {
    email: payload.email || "",
    name: payload.name || "",
    picture: payload.picture,
    sub: payload.sub || "",
  };
}
