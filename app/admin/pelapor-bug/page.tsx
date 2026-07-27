import AdminShell from "@/components/AdminShell";
import AdminBugReportsManager from "@/components/AdminBugReportsManager";
import { getBugReports } from "@/lib/bug-reports";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminPelaporBugPage() {
  await requireAdmin();

  const reports = await getBugReports();

  return (
    <AdminShell title="Pelapor Bug" subtitle="Admin Dashboard / Pelapor Bug">
      <AdminBugReportsManager reports={reports} />
    </AdminShell>
  );
}
