import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hash, compare } from "bcrypt";
import crypto from "crypto";

// User type
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
};

type PasswordReset = {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
};

// Mock database
const users: User[] = [];
let passwordResets: PasswordReset[] = [];

// Helper to generate JWT tokens
function generateToken(payload: any): string {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signature = crypto
    .createHmac("sha256", "your-secret-key")
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export async function login({ email, password }: { email: string; password: string }) {
  const user = users.find((u) => u.email === email);
  if (!user || !(await compare(password, user.password))) {
    return { success: false, error: "Invalid email or password" };
  }
  const token = generateToken({ id: user.id, email: user.email, role: user.role, exp: Date.now() + 604800000 });
  (await cookies()).set("auth-token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 604800, path: "/" });
  return { success: true };
}

export async function signup({ name, email, password }: { name: string; email: string; password: string }) {
  if (users.find((u) => u.email === email)) return { success: false, error: "Email already in use" };
  users.push({ id: crypto.randomUUID(), name, email, password: await hash(password, 10), role: "user", createdAt: new Date() });
  return { success: true };
}

export async function forgotPassword(email: string) {
  const user = users.find((u) => u.email === email);
  if (!user) return { success: true };
  const token = crypto.randomBytes(32).toString("hex");
  passwordResets.push({ id: crypto.randomUUID(), token, userId: user.id, expiresAt: new Date(Date.now() + 3600000), createdAt: new Date() });
  console.log(`Reset link: /reset-password?token=${token}`);
  return { success: true };
}

export async function resetPassword({ token, password }: { token: string; password: string }) {
  const passwordReset = passwordResets.find((pr) => pr.token === token);
  if (!passwordReset || passwordReset.expiresAt < new Date()) return { success: false, error: "Invalid or expired token" };
  const user = users.find((u) => u.id === passwordReset.userId);
  if (!user) return { success: false, error: "User not found" };
  user.password = await hash(password, 10);
  passwordResets = passwordResets.filter((pr) => pr.id !== passwordReset.id);
  return { success: true };
}

export async function logout() {
  (await cookies()).delete("auth-token");
  redirect("/login");
}

export async function getCurrentUser() {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return null;
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    if (payload.exp < Date.now()) {
      (await cookies()).delete("auth-token");
      return null;
    }
    return users.find((u) => u.id === payload.id) || null;
  } catch {
    return null;
  }
}

export default { login, signup, forgotPassword, resetPassword, logout, getCurrentUser };