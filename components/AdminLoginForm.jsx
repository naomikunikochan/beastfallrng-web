"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { adminLoginAction } from "@/app/admin/actions";

export default function AdminLoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await adminLoginAction(formData);

      if (!result.ok) {
        await Swal.fire({
          icon: "error",
          title: "Login gagal",
          text: result.message,
          background: "#020617",
          color: "#fff",
          confirmButtonColor: "#2563EB",
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Login berhasil",
        text: "Masuk ke dashboard admin.",
        timer: 1100,
        showConfirmButton: false,
        background: "#020617",
        color: "#fff",
      });

      router.push("/admin/beranda");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      <input
        name="username"
        placeholder="Username"
        className="bg-black px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-[#3874FF]"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="bg-black px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-[#3874FF]"
        required
      />
      <button
        disabled={pending}
        className="bg-[#2563EB] px-6 py-4 text-sm font-black uppercase text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Loading..." : "Masuk Admin"}
      </button>
    </form>
  );
}
