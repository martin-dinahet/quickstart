import { jwtVerify, SignJWT } from "jose";
import type { SessionPayload } from "@/lib/definitions/session";

const secretKey = process.env.SESSION_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export const encryptJWT = async (payload: SessionPayload): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};

export const decryptJWT = async (session: string): Promise<SessionPayload> => {
  const { payload } = await jwtVerify(session, encodedKey, {
    algorithms: ["HS256"],
  });
  return payload as SessionPayload;
};
