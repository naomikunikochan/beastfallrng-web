"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { File as FileIcon, UploadCloud, X } from "lucide-react";

type FileUploadProps = {
  name?: string;
  currentUrl?: string;
};

export default function FileUpload({ name = "image", currentUrl = "" }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrag(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(event.type === "dragenter" || event.type === "dragover");
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files?.[0]) {
      const file = event.dataTransfer.files[0];
      const transfer = new DataTransfer();

      transfer.items.add(file);
      setFiles([file]);

      if (inputRef.current) {
        inputRef.current.files = transfer.files;
      }
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      setFiles([event.target.files[0]]);
    }
  }

  function removeFile() {
    setFiles([]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function formatSize(bytes: number) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, index)).toFixed(2))} ${sizes[index]}`;
  }

  return (
    <div className="rounded-xl border border-[var(--admin-border,#334155)] bg-[var(--admin-surface-soft,rgba(255,255,255,0.04))] p-4 text-[var(--admin-text,#fff)] transition-colors">
      <div className="mb-3">
        <p className="text-sm font-medium text-[var(--admin-text,#fff)]">Upload image</p>
        <p className="mt-1 text-xs text-[var(--admin-muted,#94a3b8)]">PNG, JPG, WEBP sampai 5MB</p>
      </div>

      <input
        ref={inputRef}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`flex h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
          dragActive
            ? "border-[var(--admin-accent,#2563EB)] bg-[var(--admin-accent-soft,rgba(37,99,235,0.14))]"
            : "border-[var(--admin-border,#334155)] hover:bg-[var(--admin-accent-soft,rgba(37,99,235,0.14))]"
        }`}
      >
        <UploadCloud className="mb-3 h-9 w-9 text-[var(--admin-accent,#2563EB)]" />
        <p className="text-sm font-medium text-[var(--admin-text,#fff)]">
          Drag & drop image atau <span className="text-[var(--admin-accent,#2563EB)]">browse</span>
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-3 rounded-lg border border-[var(--admin-border,#334155)] bg-[var(--admin-surface,rgba(0,0,0,0.24))] p-3">
          {files.map((file) => (
            <div key={file.name} className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded bg-[var(--admin-accent-soft,rgba(37,99,235,0.14))] p-2 text-[var(--admin-accent,#2563EB)]">
                  <FileIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--admin-text,#fff)]">{file.name}</p>
                  <p className="text-xs text-[var(--admin-muted,#94a3b8)]">{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="rounded-md p-2 text-[var(--admin-muted,#94a3b8)] transition hover:bg-red-50 hover:text-red-600"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {currentUrl && files.length === 0 && (
        <a
          href={currentUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 block text-sm font-medium text-[var(--admin-accent,#2563EB)]"
        >
          Lihat image saat ini
        </a>
      )}
    </div>
  );
}
