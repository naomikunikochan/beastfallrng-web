import AdminShell from "@/components/AdminShell";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminPengaturanPage() {
  await requireAdmin();

  return (
    <AdminShell title="Pengaturan Website" subtitle="Admin Dashboard / Pengaturan Website">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="admin-card rounded-xl p-6">
          <h2 className="text-2xl font-bold text-[var(--admin-text)]">Identitas Website</h2>
          <div className="mt-6 grid gap-4">
            <input value="Beastfall RNG" readOnly className="admin-input rounded-md px-4 py-3 outline-none" />
            <input value="Website komunitas dan informasi pemain" readOnly className="admin-input rounded-md px-4 py-3 outline-none" />
          </div>
        </section>
        <section className="admin-card rounded-xl p-6">
          <h2 className="text-2xl font-bold text-[var(--admin-text)]">Status</h2>
          <p className="mt-4 text-base font-medium leading-7 text-[var(--admin-muted)]">
            Halaman pengaturan sudah disiapkan untuk nanti disambungkan ke
            database, seperti logo, social media, dan teks footer.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}
