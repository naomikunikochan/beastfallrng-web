import AdminShell from "@/components/AdminShell";
import AdminMediaManager from "@/components/AdminMediaManager";
import { requireAdmin } from "@/lib/admin-auth";
import { getMediaItems } from "@/lib/media";

export default async function AdminMediaPage() {
  await requireAdmin();

  const items = await getMediaItems(true);

  return (
    <AdminShell title="Media" subtitle="Admin Dashboard / Media">
      <AdminMediaManager items={items} />
    </AdminShell>
  );
}
