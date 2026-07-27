"use server";

import { loginAdmin, logoutAdmin } from "@/lib/admin-auth";

export async function adminLoginAction(formData: FormData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  return loginAdmin(username, password);
}

export async function adminLogoutAction() {
  await logoutAdmin();
}
