"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { createMediaItem, deleteMediaItem } from "@/app/admin/media/actions";
import FileUpload from "@/components/ui/file-upload";

export default function AdminMediaManager({ items }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleCreate(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        await createMediaItem(formData);
        form.reset();
        await Swal.fire({
          icon: "success",
          title: "Media tersimpan",
          timer: 1100,
          showConfirmButton: false,
          background: "#020617",
          color: "#fff",
        });
        router.refresh();
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Gagal simpan media",
          text: error instanceof Error ? error.message : "Terjadi kesalahan",
          background: "#020617",
          color: "#fff",
          confirmButtonColor: "#6C5CE7",
        });
      }
    });
  }

  function handleDelete(item) {
    startTransition(async () => {
      const result = await Swal.fire({
        icon: "warning",
        title: "Hapus media?",
        text: "Data dan image di Supabase Storage akan dihapus.",
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
        await deleteMediaItem(item.id, item.image_url);
        router.refresh();
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Gagal hapus media",
          text: error instanceof Error ? error.message : "Terjadi kesalahan",
          background: "#020617",
          color: "#fff",
          confirmButtonColor: "#6C5CE7",
        });
      }
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={handleCreate} className="admin-card rounded-xl p-6">
        <h2 className="text-2xl font-medium text-[var(--admin-text)]">Upload Media</h2>
        <p className="mt-1 text-sm font-semibold text-[var(--admin-muted)]">
          Upload wallpaper/media ke Supabase Storage.
        </p>
        <div className="mt-6 grid gap-4">
          <input
            name="title"
            placeholder="Judul media"
            className="admin-input rounded-md px-4 py-3 outline-none"
            required
          />
          <input
            name="category"
            placeholder="Kategori, contoh: Wallpaper"
            defaultValue="Wallpaper"
            className="admin-input rounded-md px-4 py-3 outline-none"
            required
          />
          <FileUpload />
          <button
            disabled={pending}
            className="rounded-md bg-[var(--admin-accent)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--admin-accent-hover)] disabled:opacity-60"
          >
            Simpan Media
          </button>
        </div>
      </form>

      <div className="admin-card rounded-xl p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-medium text-[var(--admin-text)]">Media Tersimpan</h2>
          <span className="rounded-md bg-[var(--admin-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--admin-accent)]">
            {items.length} media
          </span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--admin-border)" }}>
              <div
                className="h-44 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image_url})` }}
              />
              <div className="flex items-center justify-between gap-3 p-4" style={{ background: "var(--admin-surface-soft)" }}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--admin-accent)]">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-medium text-[var(--admin-text)]">{item.title}</h3>
                </div>
                <button
                  onClick={() => handleDelete(item)}
                  disabled={pending}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
                  aria-label="Hapus media"
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
