"use client";

import React from "react";

/**
 * Komponen menampilkan status soal secara ringkas.
 * Menampilkan counter percobaan dan persentase kemajuan dalam satu bar.
 * Props:
 *  - attemptsUsed: jumlah percobaan yang sudah dilakukan (0‑based)
 *  - totalAttempts: total percobaan yang diperbolehkan (default 2)
 *  - progress: nilai antara 0‑1 yang merepresentasikan persentase selesai
 */
export default function StatusSoal({
  attemptsUsed,
  totalAttempts = 2,
  progress,
}: {
  attemptsUsed: number;
  totalAttempts?: number;
  progress: number;
}) {
  const percent = Math.round(progress * 100);
  return (
    <div className="flex items-center space-x-2 text-sm text-slate-600">
      <span>
        Percobaan {attemptsUsed + 1} / {totalAttempts}
      </span>
      <span className="mx-1">·</span>
      <span>{percent}%</span>
    </div>
  );
}

