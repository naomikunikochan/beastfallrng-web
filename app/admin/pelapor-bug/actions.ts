"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

export async function updateBugReportStatus(id: string, status: string) {
  await requireAdmin();

  const allowedStatuses = ["bug baru", "proses fix", "done"];

  if (!id || !allowedStatuses.includes(status)) {
    throw new Error("Status bug tidak valid");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase config missing");
  }

  const response = await fetch(`${url}/rest/v1/bug_reports?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      status,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  revalidatePath("/admin/pelapor-bug");
  revalidatePath("/admin/beranda");
}

function getStoragePaths(urls: string[]) {
  return urls
    .map((url) => url.split("/storage/v1/object/public/image/")[1])
    .filter(Boolean);
}

export async function deleteBugReport(id: string, imageUrls: string[]) {
  await requireAdmin();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase config missing");
  }

  const paths = getStoragePaths(imageUrls);

  if (paths.length > 0) {
    const storageResponse = await fetch(`${url}/storage/v1/object/image`, {
      method: "DELETE",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefixes: paths }),
    });

    if (!storageResponse.ok) {
      throw new Error(await storageResponse.text());
    }
  }

  const response = await fetch(`${url}/rest/v1/bug_reports?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=minimal",
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  revalidatePath("/admin/pelapor-bug");
  revalidatePath("/admin/beranda");
}
