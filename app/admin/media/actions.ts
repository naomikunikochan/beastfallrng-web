"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

async function uploadMediaImage(file: File, title: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || file.size === 0) {
    return "";
  }

  const extension = file.name.split(".").pop() || "jpg";
  const safeTitle = title.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const path = `media-${safeTitle}-${crypto.randomUUID()}.${extension}`;
  const response = await fetch(`${url}/storage/v1/object/image/${path}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return `${url}/storage/v1/object/public/image/${path}`;
}

function getStoragePath(url: string) {
  return url.split("/storage/v1/object/public/image/")[1] || "";
}

export async function createMediaItem(formData: FormData) {
  await requireAdmin();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase config missing");
  }

  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "Wallpaper").trim();
  const image = formData.get("image");

  if (!title || !(image instanceof File) || image.size === 0) {
    throw new Error("Judul dan image wajib diisi");
  }

  const imageUrl = await uploadMediaImage(image, title);
  const response = await fetch(`${url}/rest/v1/media_items`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      title,
      category,
      image_url: imageUrl,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  revalidatePath("/media");
  revalidatePath("/admin/media");
}

export async function deleteMediaItem(id: string, imageUrl: string) {
  await requireAdmin();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase config missing");
  }

  const path = getStoragePath(imageUrl);

  if (path) {
    await fetch(`${url}/storage/v1/object/image`, {
      method: "DELETE",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefixes: [path] }),
    });
  }

  const response = await fetch(`${url}/rest/v1/media_items?id=eq.${id}`, {
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

  revalidatePath("/media");
  revalidatePath("/admin/media");
}
