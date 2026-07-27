"use server";

type RecaptchaResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error("reCAPTCHA secret missing");
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });

  const result = (await response.json()) as RecaptchaResponse;

  if (!result.success || result.action !== "bug_report" || (result.score ?? 0) < 0.5) {
    throw new Error("Verifikasi reCAPTCHA gagal. Coba kirim ulang.");
  }
}

async function uploadBugImage(file: File, title: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || file.size === 0) {
    return "";
  }

  const extension = file.name.split(".").pop() || "jpg";
  const safeTitle = title.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const path = `bug-${safeTitle}-${crypto.randomUUID()}.${extension}`;
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

export async function createBugReport(formData: FormData) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase config missing");
  }

  const reporterName = String(formData.get("reporter_name") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const recaptchaToken = String(formData.get("recaptcha_token") || "").trim();
  const imageFile = formData.get("image");

  if (!reporterName || !title || !description) {
    throw new Error("Nama, judul bug, dan deskripsi wajib diisi");
  }

  if (!recaptchaToken) {
    throw new Error("reCAPTCHA token missing");
  }

  await verifyRecaptcha(recaptchaToken);

  const imageUrl = imageFile instanceof File ? await uploadBugImage(imageFile, title) : "";

  const response = await fetch(`${url}/rest/v1/bug_reports`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      reporter_name: reporterName,
      contact,
      title,
      description,
      image_url: imageUrl,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}
