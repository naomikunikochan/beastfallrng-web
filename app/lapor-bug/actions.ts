"use server";

type RecaptchaResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error("reCAPTCHA secret missing");
  }

  let response: Response;

  try {
    response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    });
  } catch {
    throw new Error("Gagal menghubungi reCAPTCHA. Cek koneksi server.");
  }

  const result = (await response.json()) as RecaptchaResponse;

  if (!result.success) {
    throw new Error("Verifikasi reCAPTCHA gagal. Coba kirim ulang.");
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  let response: Response | null = null;
  let lastError = "";

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await fetch(`${url}/storage/v1/object/image/${path}`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": file.type || "application/octet-stream",
          "x-upsert": "true",
        },
        body: file,
      });

      if (response.ok) {
        return `${url}/storage/v1/object/public/image/${path}`;
      }

      lastError = await response.text();
    } catch (error) {
      lastError = error instanceof Error ? error.message : "fetch failed";
    }

    if (attempt < 3) {
      await wait(attempt * 700);
    }
  }

  throw new Error(
    `Gagal upload gambar ke Supabase Storage setelah 3 percobaan. ${lastError}`,
  );
}

function validateImageFiles(files: File[]) {
  const maxSize = 5 * 1024 * 1024;

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      throw new Error("File harus berupa gambar PNG, JPG, atau WEBP.");
    }

    if (file.size > maxSize) {
      throw new Error("Ukuran tiap gambar maksimal 5MB.");
    }
  }
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
  const recaptchaToken = String(formData.get("g-recaptcha-response") || "").trim();
  const imageFiles = formData
    .getAll("image")
    .filter((file): file is File => file instanceof File && file.size > 0)
    .slice(0, 3);

  if (!reporterName || !title || !description) {
    throw new Error("Nama, judul bug, dan deskripsi wajib diisi");
  }

  if (!recaptchaToken) {
    throw new Error("reCAPTCHA token missing");
  }

  validateImageFiles(imageFiles);

  await verifyRecaptcha(recaptchaToken);

  const imageUrls = await Promise.all(
    imageFiles.map((file) => uploadBugImage(file, title)),
  );

  const payload = {
    reporter_name: reporterName,
    contact,
    title,
    description,
    image_url: imageUrls.length > 1 ? JSON.stringify(imageUrls) : imageUrls[0] || "",
  };

  let response: Response;

  try {
    response = await fetch(`${url}/rest/v1/bug_reports`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        ...payload,
        image_urls: imageUrls,
      }),
    });
  } catch {
    throw new Error("Gagal menyimpan laporan ke Supabase Database. Cek koneksi atau URL Supabase.");
  }

  if (!response.ok && (await response.clone().text()).includes("image_urls")) {
    response = await fetch(`${url}/rest/v1/bug_reports`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });
  }

  if (!response.ok) {
    throw new Error(await response.text());
  }
}
