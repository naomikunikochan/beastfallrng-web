"use client";

import { useTransition } from "react";
import Swal from "sweetalert2";
import { createBugReport } from "@/app/lapor-bug/actions";
import FileUpload from "@/components/ui/file-upload";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function BugReportForm() {
  const [pending, startTransition] = useTransition();

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        const token = window.grecaptcha?.getResponse();

        if (!siteKey || !token) {
          throw new Error("Centang reCAPTCHA terlebih dahulu.");
        }

        await createBugReport(formData);
        window.grecaptcha?.reset();
        form.reset();

        await Swal.fire({
          icon: "success",
          title: "Laporan terkirim",
          text: "Terima kasih. Bug akan dicek oleh admin.",
          timer: 1400,
          showConfirmButton: false,
          background: "#020617",
          color: "#fff",
        });
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Gagal kirim laporan",
          text: error instanceof Error ? error.message : "Terjadi kesalahan",
          background: "#020617",
          color: "#fff",
          confirmButtonColor: "#2563EB",
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="reporter_name"
          placeholder="Nama Roblox / Discord"
          className="bg-black px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-[#3874FF]"
          required
        />
        <input
          name="contact"
          placeholder="Kontak (opsional)"
          className="bg-black px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-[#3874FF]"
        />
      </div>
      <input
        name="title"
        placeholder="Judul bug"
        className="bg-black px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-[#3874FF]"
        required
      />
      <textarea
        name="description"
        placeholder="Jelaskan bug, lokasi, langkah reproduksi, dan dampaknya."
        rows={8}
        className="bg-black px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-[#3874FF]"
        required
      />
      <FileUpload />
      {siteKey && <div className="g-recaptcha" data-sitekey={siteKey} />}
      <button
        disabled={pending}
        className="bg-[#2563EB] px-6 py-4 text-sm font-black uppercase text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Mengirim..." : "Kirim Laporan"}
      </button>
    </form>
  );
}
