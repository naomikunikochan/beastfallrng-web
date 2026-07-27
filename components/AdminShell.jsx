"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { adminLogoutAction } from "@/app/admin/actions";

const menus = [
  { label: "Beranda", href: "/admin/beranda", icon: "⌂" },
  { label: "Artikel", href: "/admin/artikel", icon: "▤" },
  { label: "Media", href: "/admin/media", icon: "▧" },
  { label: "Pelapor Bug", href: "/admin/pelapor-bug", icon: "!" },
  { label: "Pengaturan Website", href: "/admin/pengaturan", icon: "⚙" },
];

function subscribeTheme(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("admin-theme-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("admin-theme-change", callback);
  };
}

function getThemeSnapshot() {
  return localStorage.getItem("beastfall-admin-theme") || "light";
}

function getServerThemeSnapshot() {
  return "light";
}

export default function AdminShell({ children, title, subtitle }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const darkMode = theme === "dark";

  function toggleTheme() {
    localStorage.setItem("beastfall-admin-theme", darkMode ? "light" : "dark");
    window.dispatchEvent(new Event("admin-theme-change"));
  }

  return (
    <main className={`admin-theme min-h-screen text-[var(--admin-text)] transition-colors duration-300 ${darkMode ? "admin-dark" : ""}`} style={{ background: "var(--admin-bg)" }}>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 border-r px-5 py-8 shadow-sm transition-colors duration-300 lg:block" style={{ background: "var(--admin-surface)", borderColor: "var(--admin-border)" }}>
        <Link href="/admin/beranda" className="block text-center">
          <Image
            src="/logo.png"
            alt="Beastfall RNG"
            width={240}
            height={64}
            priority
            className="mx-auto h-auto w-44 object-contain"
          />
          <span className="mt-1 block text-lg font-semibold text-[var(--admin-text)]">
            Admin Panel
          </span>
        </Link>

        <div className="mt-12">
          <p className="px-4 text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">
            Main Menu
          </p>
          <nav className="mt-4 grid gap-2">
            {menus.map((menu) => {
              const active = pathname === menu.href;

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium transition ${
                    active
                      ? "bg-[var(--admin-accent)] text-white shadow-lg shadow-[#6C5CE7]/25"
                      : "text-[var(--admin-muted)] hover:bg-[var(--admin-accent-soft)] hover:text-[var(--admin-accent)]"
                  }`}
                >
                  <span className="w-5 text-center">{menu.icon}</span>
                  {menu.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-12">
          <p className="px-4 text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)]">
            Website
          </p>
          <Link
            href="/"
            className="mt-4 flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium text-[var(--admin-muted)] transition hover:bg-[var(--admin-accent-soft)] hover:text-[var(--admin-accent)]"
          >
            <span className="w-5 text-center">↗</span>
            Lihat Public
          </Link>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b px-5 py-4 backdrop-blur transition-colors duration-300 lg:px-8" style={{ background: "var(--admin-header)", borderColor: "var(--admin-border)" }}>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Buka menu admin"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--admin-accent)] text-white lg:hidden"
              >
                ☰
              </button>
              <button
                onClick={toggleTheme}
                aria-label="Toggle admin theme"
                className="relative flex h-10 w-16 items-center rounded-full bg-[var(--admin-accent-soft)] p-1 transition"
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-[var(--admin-accent)] text-sm text-white shadow transition-transform duration-300 ${darkMode ? "translate-x-6" : "translate-x-0"}`}>
                  {darkMode ? "☾" : "◐"}
                </span>
              </button>
              <div className="lg:hidden">
                <Image
                  src="/logo.png"
                  alt="Beastfall RNG"
                  width={180}
                  height={48}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="font-bold text-[var(--admin-text)]">Admin</p>
                <p className="text-sm text-[var(--admin-muted)]">Beastfall RNG</p>
              </div>
              <div className="h-11 w-11 rounded-full bg-[linear-gradient(135deg,#6C5CE7,#38BDF8)]" />
              <form action={adminLogoutAction}>
                <button className="rounded-md bg-[var(--admin-accent)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--admin-accent-hover)]">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </header>

        <div className="admin-animate mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-medium tracking-tight text-[var(--admin-text)]">
                {title}
              </h1>
              <p className="mt-2 text-base font-medium text-[var(--admin-accent)]">
                {subtitle}
              </p>
            </div>
          </div>

          {children}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)}>
          <aside
            className="h-full w-72 border-r px-5 py-8 shadow-xl"
            style={{ background: "var(--admin-surface)", borderColor: "var(--admin-border)" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <Link href="/admin/beranda" onClick={() => setMobileOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="Beastfall RNG"
                  width={180}
                  height={48}
                  className="h-auto w-40 object-contain"
                />
                <span className="mt-1 block text-base font-semibold text-[var(--admin-text)]">
                  Admin Panel
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md bg-[var(--admin-accent-soft)] px-3 py-2 text-[var(--admin-muted)]"
                aria-label="Tutup menu admin"
              >
                ×
              </button>
            </div>

            <nav className="mt-10 grid gap-2">
              {menus.map((menu) => {
                const active = pathname === menu.href;

                return (
                  <Link
                    key={menu.href}
                    href={menu.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium transition ${
                      active
                        ? "bg-[var(--admin-accent)] text-white shadow-lg shadow-[#6C5CE7]/25"
                        : "text-[var(--admin-muted)] hover:bg-[var(--admin-accent-soft)] hover:text-[var(--admin-accent)]"
                    }`}
                  >
                    <span className="w-5 text-center">{menu.icon}</span>
                    {menu.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </main>
  );
}
