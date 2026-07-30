import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminPage() {
  if (await isAdminAuthenticated()) {
    redirect("/administrator/beranda");
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-black px-5 py-20 text-white lg:px-8">
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(135deg,#020617_0%,#030712_45%,#000_100%)]" />
      <div className="animate-soft-pulse absolute left-[12%] top-[18%] -z-20 h-64 w-64 rounded-full bg-[#2563EB]/25 blur-3xl" />
      <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <p className="text-sm font-black uppercase tracking-[0.36em] text-[#3874FF]">
            Admin Panel
          </p>
          <h1 className="mt-5 text-5xl font-black uppercase leading-none sm:text-7xl">
            Login Admin
          </h1>
          <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-slate-400">
            Masuk untuk mengelola admin Beastfall RNG.
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </main>
  );
}
