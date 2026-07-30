import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "beastfall_admin_session";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(cookieName)?.value;

  return Boolean(session && session === process.env.ADMIN_PASSWORD);
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/administrator");
  }
}

export async function loginAdmin(username: string, password: string) {
  const validUsername = process.env.ADMIN_USERNAME || "admin";
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validPassword || username !== validUsername || password !== validPassword) {
    return { ok: false, message: "Username atau password salah" };
  }

  const cookieStore = await cookies();

  cookieStore.set(cookieName, password, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/administrator",
    maxAge: 60 * 60 * 8,
  });

  return { ok: true, message: "Login berhasil" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  cookieStore.delete(cookieName);
  redirect("/administrator");
}
