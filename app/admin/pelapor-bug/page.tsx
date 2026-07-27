import AdminShell from "@/components/AdminShell";
import { formatBugReportDate, getBugReports } from "@/lib/bug-reports";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminPelaporBugPage() {
  await requireAdmin();

  const reports = await getBugReports();

  return (
    <AdminShell title="Pelapor Bug" subtitle="Admin Dashboard / Pelapor Bug">
      <div className="admin-card rounded-xl p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-medium text-[var(--admin-text)]">Laporan Masuk</h2>
            <p className="mt-1 text-sm font-semibold text-[var(--admin-muted)]">
              Data laporan bug dari halaman public `/lapor-bug`.
            </p>
          </div>
          <div className="rounded-md bg-[var(--admin-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--admin-accent)]">
            {reports.length} laporan
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {reports.length === 0 && (
            <div className="rounded-xl border border-dashed p-8 text-center text-[var(--admin-muted)]" style={{ borderColor: "var(--admin-border)" }}>
              Belum ada laporan bug.
            </div>
          )}

          {reports.map((report) => (
            <article key={report.id} className="rounded-xl border p-5" style={{ borderColor: "var(--admin-border)", background: "var(--admin-surface-soft)" }}>
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--admin-accent)]">
                    {report.status} / {formatBugReportDate(report.created_at)}
                  </p>
                  <h3 className="mt-2 text-xl font-medium text-[var(--admin-text)]">
                    {report.title}
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-semibold text-[var(--admin-text)]">
                    {report.reporter_name}
                  </p>
                  {report.contact && (
                    <p className="mt-1 text-sm text-[var(--admin-muted)]">{report.contact}</p>
                  )}
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[var(--admin-muted)]">
                {report.description}
              </p>
              {report.image_url && (
                <a
                  href={report.image_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 block overflow-hidden rounded-xl border"
                  style={{ borderColor: "var(--admin-border)" }}
                >
                  <div
                    className="h-64 bg-cover bg-center transition hover:scale-[1.01]"
                    style={{ backgroundImage: `url(${report.image_url})` }}
                  />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
