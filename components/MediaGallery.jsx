"use client";

import { useState } from "react";

export default function MediaGallery({ items }) {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <>
      <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="group overflow-hidden bg-[#102947]/90 shadow-xl">
            <div
              className="h-56 bg-cover bg-center transition duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.image_url})` }}
            />
            <div className="grid grid-cols-[1fr_76px] border-t border-[#2563EB]/40 bg-[#0b2038]/95">
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-wide text-[#38BDF8]">
                  {item.category}
                </p>
                <h2 className="mt-2 text-lg font-black uppercase text-white">
                  {item.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveItem(item)}
                className="flex items-center justify-center border-l border-[#2563EB]/40 text-3xl text-white transition hover:bg-[#2563EB]"
                aria-label={`Preview ${item.title}`}
              >
                ⌕
              </button>
            </div>
          </article>
        ))}
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#00101f]/85 px-5 backdrop-blur-sm">
          <div className="w-full max-w-5xl border border-[#4B6BAA] bg-[#071525] p-2 shadow-2xl">
            <div className="mb-2 grid grid-cols-[1fr_56px] bg-[#081625] text-white">
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="text-[#FACC15]">▣</span>
                <h2 className="font-black uppercase">{activeItem.title}</h2>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="bg-[#1c3156] text-3xl transition hover:bg-[#2563EB]"
                aria-label="Close preview"
              >
                ×
              </button>
            </div>
            <div
              className="h-[min(68vh,680px)] bg-cover bg-center"
              style={{ backgroundImage: `url(${activeItem.image_url})` }}
            />
          </div>
        </div>
      )}
    </>
  );
}
