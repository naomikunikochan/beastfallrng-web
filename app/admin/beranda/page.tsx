import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import { getBugReports } from "@/lib/bug-reports";
import { getArticles } from "@/lib/articles";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminBerandaPage() {
  await requireAdmin();

  const articles = await getArticles(true);
  const bugReports = await getBugReports();

  return (
    <AdminShell title="Dashboard" subtitle="Admin Dashboard">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="admin-card rounded-xl p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-3xl font-semibold text-[var(--admin-text)]">{articles.length}</p>
              <p className="mt-1 text-base font-medium text-[var(--admin-muted)]">Artikel</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--admin-accent-soft)] text-2xl text-[var(--admin-accent)]">
              ▤
            </div>
          </div>
        </div>
        <div className="admin-card rounded-xl p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-3xl font-semibold text-[var(--admin-text)]">{bugReports.length}</p>
              <p className="mt-1 text-base font-medium text-[var(--admin-muted)]">Laporan Bug</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--admin-accent-soft)] text-2xl text-[var(--admin-accent)]">
              ⊞
            </div>
          </div>
        </div>
        <div className="admin-card rounded-xl p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-3xl font-semibold text-[var(--admin-text)]">Live</p>
              <p className="mt-1 text-base font-medium text-[var(--admin-muted)]">Website Public</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--admin-accent-soft)] text-2xl text-[var(--admin-accent)]">
              ↗
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        <Link href="/admin/artikel" className="rounded-md bg-[var(--admin-accent)] px-6 py-4 text-center font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--admin-accent-hover)]">
          Kelola Artikel
        </Link>
        <Link href="/admin/pelapor-bug" className="rounded-md bg-[var(--admin-accent)] px-6 py-4 text-center font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--admin-accent-hover)]">
          Pelapor Bug
        </Link>
        <Link href="/admin/pengaturan" className="rounded-md bg-[var(--admin-accent)] px-6 py-4 text-center font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--admin-accent-hover)]">
          Pengaturan Website
        </Link>
        <Link href="/" className="rounded-md bg-[var(--admin-accent)] px-6 py-4 text-center font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--admin-accent-hover)]">
          Buka Website Public
        </Link>
      </div>
    </AdminShell>
  );
}
