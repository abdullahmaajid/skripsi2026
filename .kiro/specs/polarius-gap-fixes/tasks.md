# Implementation Plan: Polarius Gap Fixes

## Overview

Perbaikan tujuh gap kritis secara inkremental: auth middleware, logout fix, dashboard focus-today cleanup, tutor questions consolidation, tryout list empty state, KaTeX math rendering, demo 404 fix, dan XP/streak persistensi ke database.

## Tasks

- [ ] 1. Auth Middleware — Route Protection
  - [ ] 1.1 Buat file `src/middleware.ts` dengan NextAuth v5 `auth()` higher-order function
    - Definisikan `PROTECTED_PREFIXES` array sesuai design
    - Implementasikan redirect unauthenticated ke `/auth/login?callbackUrl=<path>`
    - Implementasikan redirect non-admin dari `/admin/*` ke `/dashboard` dengan HTTP 307
    - Tambahkan `config.matcher` dengan negative lookahead untuk exclude `_next/static`, `_next/image`, `favicon.ico`, dan `/api/*`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  - [ ]* 1.2 Tulis property test untuk middleware — Property 1 & 2
    - **Property 1: Protected routes always redirect unauthenticated users**
    - **Property 2: Non-admin users are blocked from all `/admin/*` paths**
    - **Validates: Requirements 1.1, 1.2, 1.3**
    - Setup Vitest + fast-check (`npm install --save-dev fast-check`)
    - Buat `__tests__/middleware.test.ts` dengan `numRuns: 100`

- [ ] 2. Sidebar Logout Fix
  - [ ] 2.1 Modifikasi `src/components/layout/Sidebar.tsx` — perbaiki parameter `signOut`
    - Ganti `{ callbackUrl: "/" }` menjadi `{ redirectTo: "/" }` (NextAuth v5 API)
    - Tambahkan `.catch(err => console.error("signOut error:", err))` untuk error handling
    - _Requirements: 2.1, 2.2, 2.3_
  - [ ]* 2.2 Tulis unit test untuk Sidebar logout button
    - Verifikasi `onClick` handler ada dan memanggil `signOut` dengan parameter benar
    - Buat `__tests__/Sidebar.test.tsx`
    - _Requirements: 2.3_

- [ ] 3. Checkpoint — Verifikasi middleware dan logout
  - Pastikan semua tests pass, tanya user jika ada pertanyaan.

- [ ] 4. Dashboard Focus-Today Cleanup
  - [ ] 4.1 Modifikasi `src/app/(app)/dashboard/DashboardClient.tsx` — hapus fetch focus-today
    - Hapus `useState<any>(null)` untuk `focusData`
    - Hapus `useEffect` yang fetch `/api/analytics/focus-today`
    - Update card "Fokus Hari Ini" untuk render `fokusSubject` prop langsung dengan teks statis
    - _Requirements: 3.2, 3.3_
  - [ ]* 4.2 Tulis unit test untuk DashboardClient focus card
    - Verifikasi `fokusSubject` prop dirender di card tanpa fetch
    - Buat atau update `__tests__/DashboardClient.test.tsx`
    - _Requirements: 3.3_

- [ ] 5. Dashboard XP & Streak — Schema & Submit API
  - [ ] 5.1 Update `prisma/schema.prisma` — tambah field `xp` dan `streak` ke model `User`
    - Tambahkan `xp Int @default(0)` dan `streak Int @default(0)`
    - Jalankan `npx prisma migrate dev --name add_xp_streak` untuk generate migration
    - _Requirements: 8.1_
  - [ ] 5.2 Modifikasi `src/app/api/tryout/submit/route.ts` — tambah XP & streak logic
    - Tambahkan guard: skip jika `attempt.status === "COMPLETED"` (return 400)
    - Tambahkan XP increment: `prisma.user.update({ data: { xp: { increment: 150 } } })` setelah attempt selesai
    - Implementasikan helper `getWIBDate(date: Date): string` (UTC+7 offset)
    - Implementasikan streak logic: cek same-day WIB → cek yesterday WIB → increment atau reset ke 1
    - _Requirements: 8.2, 8.3, 8.4, 8.5_
  - [ ]* 5.3 Tulis property test untuk XP increment — Property 8
    - **Property 8: XP increments exactly once per attempt completion**
    - **Validates: Requirements 8.2, 8.3**
    - Buat `__tests__/submitXP.test.ts` dengan fast-check, `numRuns: 100`
  - [ ]* 5.4 Tulis property test untuk streak logic — Property 9
    - **Property 9: Streak increments correctly based on WIB calendar date**
    - **Validates: Requirements 8.4, 8.5**
    - Buat `__tests__/submitStreak.test.ts` dengan fast-check, `numRuns: 100`

- [ ] 6. Dashboard XP & Streak — DashboardPage & DashboardClient Props
  - [ ] 6.1 Modifikasi `src/app/(app)/dashboard/page.tsx` — baca `xp` dan `streak` dari DB
    - Tambahkan `xp: true` dan `streak: true` ke Prisma select di query user
    - Pass `xp={user?.xp ?? 0}` dan `streak={user?.streak ?? 0}` ke `<DashboardClient />`
    - _Requirements: 8.6_
  - [ ] 6.2 Modifikasi `src/app/(app)/dashboard/DashboardClient.tsx` — update Props interface & render
    - Tambahkan `xp: number` dan `streak: number` ke `Props` interface
    - Hapus baris hardcode `const xp = totalAttempts * 150 || 345`
    - Hitung `level = Math.floor(xp / 500) + 1` dan `xpProgress = ((xp % 500) / 500) * 100` dari prop
    - Tambahkan `UnifiedStatItem` untuk Streak dengan Flame icon di stats row
    - _Requirements: 8.7, 8.8, 8.9, 8.10_
  - [ ]* 6.3 Tulis property test untuk level/xpProgress formula — Property 10
    - **Property 10: DashboardClient level and XP progress computation**
    - **Validates: Requirements 8.8, 8.10**
    - Buat `__tests__/dashboardFormulas.test.ts` dengan fast-check, `numRuns: 100`

- [ ] 7. Checkpoint — Verifikasi XP/streak end-to-end
  - Pastikan semua tests pass, tanya user jika ada pertanyaan.

- [ ] 8. Tutor Questions — Konsolidasi ke `/api/evaluation/questions`
  - [ ] 8.1 Modifikasi `src/app/api/evaluation/questions/route.ts` — tambah `selectedIds` ke response
    - Di bagian `uniqueQuestionsMap.set()`, tambahkan `selectedIds: r.selectedIds` ke object
    - Pastikan response shape sesuai interface di design document
    - _Requirements: 4.5_
  - [ ]* 8.2 Tulis property test untuk evaluation questions response — Property 3
    - **Property 3: Evaluation questions response always includes `selectedIds`**
    - **Validates: Requirements 4.5**
    - Buat `__tests__/evaluationQuestions.test.ts`
  - [ ] 8.3 Modifikasi `src/app/(app)/tutor/[[...attemptId]]/page.tsx` — ganti fetch target
    - Ganti `fetch("/api/tutor/questions")` dengan `fetch("/api/evaluation/questions")`
    - Update mapping logic: gunakan `q.id` (bukan `q.questionId`), tambah `selectedAnswer` dan `correctAnswer` computed dari `options` + `selectedIds`
    - Tambah `selectedIds: q.selectedIds ?? []` ke `WrongQuestion` mapping
    - _Requirements: 4.1, 4.2, 4.4_
  - [ ]* 8.4 Tulis property test untuk TutorPage mapping — Property 4
    - **Property 4: TutorPage mapping preserves all required WrongQuestion fields**
    - **Validates: Requirements 4.2**
    - Buat `__tests__/tutorMapping.test.ts` dengan fast-check, `numRuns: 100`

- [ ] 9. Tryout List — Empty State
  - [ ] 9.1 Modifikasi `src/app/tryout/list/TryoutListClient.tsx` — tambah empty state
    - Tambahkan conditional render: jika `templates.length === 0` tampilkan empty-state message dengan `BookOpen` icon
    - Pastikan navigasi ke `/tryout/[id]` saat card atau tombol "Mulai" diklik sudah benar
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [ ]* 9.2 Tulis property test untuk TryoutListClient — Property 5
    - **Property 5: TryoutListClient renders all templates passed as props**
    - **Validates: Requirements 5.1, 5.2, 5.3**
    - Buat `__tests__/TryoutList.test.tsx` dengan fast-check, `numRuns: 100`

- [ ] 10. KaTeX MathText Component
  - [ ] 10.1 Install `@types/katex` devDependency
    - Jalankan `npm install --save-dev @types/katex`
    - Verifikasi `katex` sudah ada di `dependencies` (sudah ada `"katex": "^0.17.0"`)
    - _Requirements: 6.1_
  - [ ] 10.2 Buat `src/components/ui/MathText.tsx`
    - Implementasikan regex `MATH_REGEX = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g` untuk split content
    - Implementasikan `renderSegment()` untuk block (`$$`) dan inline (`$`) math dengan `katex.renderToString`
    - Tambahkan `throwOnError: false` dan `displayMode` sesuai tipe segment
    - Tambahkan try/catch untuk render `<span data-katex-error="true">` jika KaTeX ParseError
    - Short-circuit: jika content tidak mengandung `$`, langsung return `<span>{content}</span>`
    - _Requirements: 6.2, 6.6, 6.7, 6.8_
  - [ ]* 10.3 Tulis property test untuk MathText — Property 6 & 7
    - **Property 6: MathText renders math segments and passes through plain text**
    - **Property 7: MathText error handling — malformed LaTeX never crashes**
    - **Validates: Requirements 6.2, 6.6, 6.7**
    - Buat `__tests__/MathText.test.tsx` dengan fast-check, `numRuns: 100`
  - [ ] 10.4 Import KaTeX CSS di `src/app/layout.tsx`
    - Tambahkan `import 'katex/dist/katex.min.css'` ke root layout
    - _Requirements: 6.9_
  - [ ] 10.5 Ganti raw text interpolation dengan `<MathText />` di CBT Engine Page
    - Temukan file CBT engine page (cari file yang render `currentQ.text` dan `opt.text`)
    - Ganti `{currentQ.text}` dengan `<MathText content={currentQ.text} />`
    - Ganti `{opt.text}` dengan `<MathText content={opt.text} />`
    - _Requirements: 6.3_
  - [ ] 10.6 Ganti raw text interpolation dengan `<MathText />` di Review Page
    - Temukan review page yang render soal dan opsi jawaban
    - Ganti semua raw `{currentQ.text}` dan `{opt.text}` dengan `<MathText content={...} />`
    - _Requirements: 6.4_
  - [ ] 10.7 Ganti raw text interpolation dengan `<MathText />` di TutorPage
    - Di `src/app/(app)/tutor/[[...attemptId]]/page.tsx`, ganti `{selectedQuestion.text}`, `{q.text}`, dan `{opt.text}` dengan `<MathText content={...} />`
    - _Requirements: 6.5_

- [ ] 11. Checkpoint — Verifikasi KaTeX rendering
  - Pastikan semua tests pass, tanya user jika ada pertanyaan.

- [ ] 12. Demo 404 Fix
  - [ ] 12.1 Buat `src/app/tryout/demo/page.tsx` — redirect ke `/tryout/list`
    - Implementasikan server component yang memanggil `redirect("/tryout/list")` dari `next/navigation`
    - _Requirements: 7.1_
  - [ ]* 12.2 Tulis unit test untuk demo page redirect
    - Verifikasi `/tryout/demo` merender komponen yang memanggil `redirect("/tryout/list")`
    - Buat `__tests__/demoPage.test.ts`
    - _Requirements: 7.1_

- [ ] 13. Final Checkpoint — Semua gap fixes complete
  - Pastikan semua tests pass, build berhasil (`npm run build`), tanya user jika ada pertanyaan.

## Notes

- Tasks bertanda `*` bersifat opsional dan bisa dilewati untuk MVP lebih cepat
- Property tests menggunakan **fast-check** — install dengan `npm install --save-dev fast-check`
- Setiap property test harus dikonfigurasi dengan `numRuns: 100` minimum
- Semua perubahan bersifat additive atau modification — tidak ada perubahan arsitektur
- File `src/app/api/tutor/questions/route.ts` sudah tidak ada di codebase — tidak perlu dihapus
- `src/app/tryout/list/page.tsx` dan `src/app/page.tsx` tidak perlu diubah (sudah benar)
- Bacalah `node_modules/next/dist/docs/` jika ada keraguan terkait Next.js API sebelum menulis kode

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1", "5.1", "10.1", "12.1"] },
    { "id": 1, "tasks": ["1.2", "2.2", "5.2", "8.1", "9.1", "10.2", "12.2"] },
    { "id": 2, "tasks": ["5.3", "5.4", "8.2", "8.3", "9.2", "10.3", "10.4"] },
    { "id": 3, "tasks": ["4.1", "6.1", "8.4", "10.5", "10.6", "10.7"] },
    { "id": 4, "tasks": ["4.2", "6.2"] },
    { "id": 5, "tasks": ["6.3"] }
  ]
}
```
