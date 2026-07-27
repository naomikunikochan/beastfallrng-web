import Script from "next/script";
import Footer from "@/components/Footer";
import BugReportForm from "@/components/BugReportForm";

export default function LaporBugPage() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <main className="bg-black text-white">
      {siteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      )}
      <section className="relative isolate overflow-hidden px-5 py-24 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(135deg,#020617_0%,#030712_45%,#000_100%)]" />
        <div className="animate-soft-pulse absolute left-[10%] top-[20%] -z-20 h-64 w-64 rounded-full bg-[#2563EB]/25 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="animate-fade-up lg:sticky lg:top-32">
            <p className="text-sm font-black uppercase tracking-[0.38em] text-[#3874FF]">
              Bug Report
            </p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">
              Lapor Bug
            </h1>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-slate-300">
              Temukan bug di Beastfall RNG? Kirim laporan lengkap supaya admin
              bisa cek dan tindak lanjut lebih cepat.
            </p>
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-500">
              Jelaskan bug di kolom deskripsi, lalu tambahkan screenshot jika
              ada supaya masalah lebih mudah dipahami.
            </p>
          </div>

          <BugReportForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
