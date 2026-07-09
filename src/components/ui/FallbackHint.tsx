"use client";

import React from "react";

/**
 * Komponen fallback hint yang ditampilkan ketika API key tidak tersedia.
 * Pesan dapat disesuaikan melalui props, namun default sudah mencakup
 * penjelasan singkat untuk siswa.
 */
export default function FallbackHint({
  message = "Berikut adalah petunjuk singkat untuk membantu Anda menyelesaikan soal ini.",
}: {
  message?: string;
}) {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-slate-800 mt-2">
      {message}
    </div>
  );
}

