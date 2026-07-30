import AdminArticlesManager from "@/components/AdminArticlesManager";
import AdminShell from "@/components/AdminShell";
import { getArticles } from "@/lib/articles";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminArtikelPage() {
  await requireAdmin();

  const articles = await getArticles(true);

  return (
    <AdminShell title="Artikel" subtitle="Admin Dashboard / Artikel">
      <AdminArticlesManager articles={articles} />
    </AdminShell>
  );
}
