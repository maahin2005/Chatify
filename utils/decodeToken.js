import { jwtVerify } from "jose";

export async function decodeToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const { payload } = await jwtVerify(token, secret);

  return payload;
}
