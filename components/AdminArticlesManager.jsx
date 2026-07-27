"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Swal from "sweetalert2";
import { createArticle, deleteArticle, updateArticle } from "@/app/admin/artikel/actions";
import FileUpload from "@/components/ui/file-upload";

const emptyArticle = {
  id: "",
  title: "",
  slug: "",
  category: "",
  description: "",
  content: "",
  image_url: "",
  image_class: "",
};

export default function AdminArticlesManager({ articles }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [form, setForm] = useState(emptyArticle);

  function openCreateModal() {
    setMode("create");
    setForm(emptyArticle);
    setModalOpen(true);
  }

  function openEditModal(article) {
    setMode("edit");
    setForm({
      id: article.id,
      title: article.title,
      slug: article.slug,
      category: article.category,
      description: article.description,
      content: article.content || "",
      image_url: article.image_url || "",
      image_class: article.image_class || "",
    });
    setModalOpen(true);
  }

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const action = mode === "create" ? createArticle : updateArticle;

    startTransition(async () => {
      try {
        await action(formData);
        setModalOpen(false);
        setForm(emptyArticle);

        await Swal.fire({
          icon: "success",
          title: mode === "create" ? "Artikel ditambahkan" : "Artikel diupdate",
          text: "Perubahan sudah tersimpan ke Supabase.",
          timer: 1300,
          showConfirmButton: false,
          background: "#020617",
          color: "#fff",
        });

        router.refresh();
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Gagal simpan",
          text: error instanceof Error ? error.message : "Terjadi kesalahan",
          background: "#020617",
          color: "#fff",
          confirmButtonColor: "#6C5CE7",
        });
      }
    });
  }

  function handleDelete(article) {
    startTransition(async () => {
      const result = await Swal.fire({
        icon: "warning",
        title: "Hapus artikel?",
        text: `Artikel "${article.title}" akan dihapus permanen.`,
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
        await deleteArticle(article.id);

        await Swal.fire({
          icon: "success",
          title: "Artikel dihapus",
          timer: 1100,
          showConfirmButton: false,
          background: "#020617",
          color: "#fff",
        });

        router.refresh();
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Gagal hapus",
          text: error instanceof Error ? error.message : "Terjadi kesalahan",
          background: "#020617",
          color: "#fff",
          confirmButtonColor: "#6C5CE7",
        });
      }
    });
  }

  return (
    <>
      <div className="admin-card rounded-xl p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-medium text-[var(--admin-text)]">Artikel Tersimpan</h2>
            <p className="mt-1 text-sm font-semibold text-[var(--admin-muted)]">
              Tambah, edit, dan hapus artikel dari satu tabel.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="rounded-md bg-[var(--admin-accent)] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--admin-accent-hover)]"
          >
            + Tambah Data
          </button>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border" style={{ borderColor: "var(--admin-border)" }}>
          <div className="min-w-[920px]">
          <div className="grid grid-cols-[1.2fr_0.7fr_0.8fr_0.55fr] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--admin-text)]" style={{ background: "var(--admin-table-head)" }}>
            <span>Judul</span>
            <span>Kategori</span>
            <span>Slug</span>
            <span className="text-right">Aksi</span>
          </div>
          <div>
            {articles.map((article) => (
              <article key={article.id} className="grid grid-cols-[1.2fr_0.7fr_0.8fr_0.55fr] items-center gap-3 border-t px-5 py-4 transition hover:-translate-y-0.5" style={{ background: "var(--admin-surface)", borderColor: "var(--admin-border)" }}>
                <div>
                  <h3 className="font-medium text-[var(--admin-text)]">{article.title}</h3>
                  <p className="mt-1 line-clamp-1 text-sm font-medium text-[var(--admin-muted)]">
                    {article.description}
                  </p>
                </div>
                <p className="text-sm font-semibold text-[var(--admin-accent)]">{article.category}</p>
                <p className="truncate text-sm font-medium text-[var(--admin-muted)]">/{article.slug}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openEditModal(article)}
                    className="rounded-md bg-[var(--admin-accent)] px-3 py-2 text-sm font-bold text-white transition hover:bg-[var(--admin-accent-hover)]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article)}
                    disabled={pending}
                    className="rounded-md bg-[var(--admin-danger)] px-3 py-2 text-sm font-bold text-white transition hover:brightness-90 disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-5 py-6 backdrop-blur-sm">
          <div className="admin-card admin-animate flex max-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl shadow-2xl">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b p-5" style={{ borderColor: "var(--admin-border)" }}>
              <div>
                <h2 className="text-2xl font-medium text-[var(--admin-text)]">
                  {mode === "create" ? "Tambah Artikel" : "Update Artikel"}
                </h2>
                <p className="mt-1 text-sm font-medium text-[var(--admin-muted)]">
                  Isi data artikel, lalu simpan ke Supabase.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-full bg-[var(--admin-accent-soft)] px-3 py-1 text-xl font-bold text-[var(--admin-muted)] transition hover:brightness-95"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid min-h-0 gap-5 overflow-y-auto p-5">
              <input type="hidden" name="id" value={form.id} />
              <input type="hidden" name="existing_image_url" value={form.image_url} />
              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--admin-text)]">
                    Judul artikel
                  </label>
                  <input
                    name="title"
                    placeholder="Contoh: Update Beastfall RNG Juli"
                    value={form.title}
                    onChange={updateField}
                    className="admin-input w-full rounded-md px-4 py-3 outline-none"
                    required
                  />
                  <p className="mt-1 text-xs text-[var(--admin-muted)]">
                    Nama artikel yang tampil di card dan halaman detail.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--admin-text)]">
                    Slug URL
                  </label>
                  <input
                    name="slug"
                    placeholder="contoh: update-beastfall-rng-juli"
                    value={form.slug}
                    onChange={updateField}
                    className="admin-input w-full rounded-md px-4 py-3 outline-none"
                    required
                  />
                  <p className="mt-1 text-xs text-[var(--admin-muted)]">
                    Dipakai untuk link artikel, contoh `/artikel/slug-url`.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--admin-text)]">
                    Kategori
                  </label>
                  <input
                    name="category"
                    placeholder="Contoh: Pembaruan, Event, Panduan"
                    value={form.category}
                    onChange={updateField}
                    className="admin-input w-full rounded-md px-4 py-3 outline-none"
                    required
                  />
                  <p className="mt-1 text-xs text-[var(--admin-muted)]">
                    Label kecil di atas judul artikel.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--admin-text)]">
                    Deskripsi pendek
                  </label>
                  <textarea
                    name="description"
                    placeholder="Ringkasan singkat artikel untuk card dan preview."
                    rows={3}
                    value={form.description}
                    onChange={updateField}
                    className="admin-input w-full rounded-md px-4 py-3 outline-none"
                    required
                  />
                  <p className="mt-1 text-xs text-[var(--admin-muted)]">
                    Tampil di card artikel. Buat singkat, 1-2 kalimat.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--admin-text)]">
                    Isi artikel
                  </label>
                  <textarea
                    name="content"
                    placeholder="Tulis isi lengkap artikel di sini."
                    rows={5}
                    value={form.content}
                    onChange={updateField}
                    className="admin-input w-full rounded-md px-4 py-3 outline-none"
                  />
                  <p className="mt-1 text-xs text-[var(--admin-muted)]">
                    Tampil di halaman detail artikel.
                  </p>
                </div>
              </div>
              <div>
                <FileUpload currentUrl={form.image_url} />
              </div>

              <div className="flex justify-end gap-3 border-t pt-5" style={{ borderColor: "var(--admin-border)" }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-md bg-[var(--admin-accent-soft)] px-5 py-3 text-sm font-bold text-[var(--admin-muted)] transition hover:brightness-95"
                >
                  Batal
                </button>
                <button
                  disabled={pending}
                  className="rounded-md bg-[var(--admin-accent)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--admin-accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pending ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
