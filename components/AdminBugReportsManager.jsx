"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { deleteBugReport, updateBugReportStatus } from "@/app/admin/pelapor-bug/actions";
import { formatBugReportDate } from "@/lib/bug-reports";

const statuses = ["bug baru", "proses fix", "done"];

export default function AdminBugReportsManager({ reports }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleStatusChange(id, status) {
    startTransition(async () => {
      try {
        await updateBugReportStatus(id, status);
        router.refresh();
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Gagal update status",
          text: error instanceof Error ? error.message : "Terjadi kesalahan",
          background: "#020617",
          color: "#fff",
          confirmButtonColor: "#6C5CE7",
        });
      }
    });
  }

  function getReportImages(report) {
    const images = Array.isArray(report.image_urls) ? report.image_urls : [];

    if (images.length > 0) {
      return images;
    }

    return report.image_url ? [report.image_url] : [];
  }

  function handleDelete(report) {
    startTransition(async () => {
      const result = await Swal.fire({
        icon: "warning",
        title: "Hapus laporan bug?",
        text: "Data laporan dan semua foto terkait akan dihapus permanen.",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6C5CE7",
        background: "#020617",
        color: "#fff",
      });

      if (!result.isConfirmed) {
        return;
      }

      try {
        await deleteBugReport(report.id, getReportImages(report));

        await Swal.fire({
          icon: "success",
          title: "Laporan dihapus",
          timer: 1100,
          showConfirmButton: false,
          background: "#020617",
          color: "#fff",
        });

        router.refresh();
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Gagal hapus laporan",
          text: error instanceof Error ? error.message : "Terjadi kesalahan",
          background: "#020617",
          color: "#fff",
          confirmButtonColor: "#6C5CE7",
        });
      }
    });
  }

  return (
    <div className="admin-card rounded-xl p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-medium text-[var(--admin-text)]">Laporan Masuk</h2>
          <p className="mt-1 text-sm font-semibold text-[var(--admin-muted)]">
            Kelola status laporan bug dari halaman public `/lapor-bug`.
          </p>
        </div>
        <div className="rounded-md bg-[var(--admin-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--admin-accent)]">
          {reports.length} laporan
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border" style={{ borderColor: "var(--admin-border)" }}>
        <div className="min-w-[1040px]">
          <div className="grid grid-cols-[1.1fr_0.7fr_0.9fr_0.65fr_0.65fr] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--admin-text)]" style={{ background: "var(--admin-table-head)" }}>
            <span>Judul</span>
            <span>Pelapor</span>
            <span>Tanggal</span>
            <span>Status</span>
            <span className="text-right">Aksi</span>
          </div>

          {reports.length === 0 && (
            <div className="px-5 py-8 text-center text-[var(--admin-muted)]">
              Belum ada laporan bug.
            </div>
          )}

          {reports.map((report) => (
            <article key={report.id} className="grid grid-cols-[1.1fr_0.7fr_0.9fr_0.65fr_0.65fr] items-center gap-3 border-t px-5 py-4" style={{ borderColor: "var(--admin-border)", background: "var(--admin-surface)" }}>
              <div>
                <h3 className="font-medium text-[var(--admin-text)]">{report.title}</h3>
                <p className="mt-1 line-clamp-1 text-sm text-[var(--admin-muted)]">
                  {report.description}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--admin-text)]">{report.reporter_name}</p>
                {report.contact && (
                  <p className="mt-1 truncate text-sm text-[var(--admin-muted)]">{report.contact}</p>
                )}
              </div>
              <p className="text-sm text-[var(--admin-muted)]">{formatBugReportDate(report.created_at)}</p>
              <select
                value={report.status}
                disabled={pending}
                onChange={(event) => handleStatusChange(report.id, event.target.value)}
                className="admin-input rounded-md px-3 py-2 text-sm outline-none"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                {getReportImages(report).length > 0 ? (
                  <a
                    href={getReportImages(report)[0]}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-[var(--admin-accent)] px-3 py-2 text-sm font-bold text-white transition hover:bg-[var(--admin-accent-hover)]"
                    aria-label="Lihat foto bug"
                  >
                    <i className="bi bi-eye" />
                  </a>
                ) : (
                  <span className="rounded-md bg-[var(--admin-accent-soft)] px-3 py-2 text-sm text-[var(--admin-muted)]">
                    <i className="bi bi-eye-slash" />
                  </span>
                )}
                <button
                  onClick={() => handleDelete(report)}
                  disabled={pending}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
                  aria-label="Hapus laporan bug"
                >
                  <i className="bi bi-trash" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
