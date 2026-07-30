"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

async function uploadArticleImage(file: File, slug: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || file.size === 0) {
    return "";
  }

  const extension = file.name.split(".").pop() || "jpg";
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const path = `${safeSlug}-${crypto.randomUUID()}.${extension}`;
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

export async function createArticle(formData: FormData) {
  await requireAdmin();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase config missing");
  }

  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const imageClass = String(formData.get("image_class") || "").trim();
  const imageFile = formData.get("image");
  const imageUrl = imageFile instanceof File ? await uploadArticleImage(imageFile, slug) : "";

  if (!title || !slug || !category || !description) {
    throw new Error("Title, slug, kategori, dan deskripsi wajib diisi");
  }

  const response = await fetch(`${url}/rest/v1/articles`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      title,
      slug,
      category,
      description,
      content,
      image_url: imageUrl,
      image_class:
        imageClass ||
        "bg-[linear-gradient(135deg,#020617_0%,#1d4ed8_55%,#93c5fd_100%)]",
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  revalidatePath("/artikel");
  revalidatePath("/administrator/artikel");
}

export async function updateArticle(formData: FormData) {
  await requireAdmin();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase config missing");
  }

  const id = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const imageClass = String(formData.get("image_class") || "").trim();
  const existingImageUrl = String(formData.get("existing_image_url") || "").trim();
  const imageFile = formData.get("image");
  const imageUrl = imageFile instanceof File ? await uploadArticleImage(imageFile, slug) : "";

  if (!id || !title || !slug || !category || !description) {
    throw new Error("ID, title, slug, kategori, dan deskripsi wajib diisi");
  }

  const response = await fetch(`${url}/rest/v1/articles?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      title,
      slug,
      category,
      description,
      content,
      image_url: imageUrl || existingImageUrl,
      image_class:
        imageClass ||
        "bg-[linear-gradient(135deg,#020617_0%,#1d4ed8_55%,#93c5fd_100%)]",
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  revalidatePath("/artikel");
  revalidatePath("/administrator/artikel");
}

export async function deleteArticle(id: string) {
  await requireAdmin();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase config missing");
  }

  const response = await fetch(`${url}/rest/v1/articles?id=eq.${id}`, {
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

  revalidatePath("/artikel");
  revalidatePath("/administrator/artikel");
}
