# Requirements Document

## Introduction

Polarius Gap Fixes mencakup perbaikan tujuh gap kritis pada aplikasi Polarius ITS (platform persiapan UTBK berbasis Next.js App Router). Gap-gap ini meliputi keamanan (route tidak terlindungi, admin tanpa role check, logout tidak berfungsi), efisiensi backend (redundant API calls, duplicate endpoint), pengalaman pengguna (template tryout tidak bisa dipilih, soal matematika tampil sebagai raw text, halaman demo 404), dan konsistensi data (XP/streak dihitung dengan hardcode tanpa persistensi ke DB).

Semua perbaikan bersifat incremental dan tidak mengubah arsitektur utama aplikasi — stack tetap Next.js App Router, Prisma (PostgreSQL), NextAuth v5 (JWT strategy), Zustand, Recharts, dan Framer Motion.

---

## Glossary

- **Middleware**: File `src/middleware.ts` yang dieksekusi Next.js pada setiap request sebelum route handler, digunakan untuk proteksi route.
- **Session**: JWT session yang dikelola NextAuth v5 — berisi `id`, `name`, `email`, dan `role` user.
- **ADMIN**: Nilai enum `Role.ADMIN` pada model `User` di Prisma schema.
- **STUDENT**: Nilai enum `Role.STUDENT` pada model `User` di Prisma schema (default).
- **DashboardClient**: Client component di `src/app/(app)/dashboard/DashboardClient.tsx` yang merender UI dashboard.
- **DashboardPage**: Server component di `src/app/(app)/dashboard/page.tsx` yang mengambil data dari DB dan meneruskan props ke DashboardClient.
- **focus-today**: Data berisi chapter/subject yang paling perlu diperbaiki user hari ini, sebelumnya di-fetch via `/api/analytics/focus-today`.
- **learning-path**: Endpoint `/api/learning-path` yang mengkalkulasi mastery per chapter berdasarkan QuestionResponse user.
- **TutorPage**: Page di `src/app/(app)/tutor/[[...attemptId]]/page.tsx`.
- **Evaluation_Questions_API**: Endpoint `/api/evaluation/questions` yang mengembalikan soal-soal yang pernah dijawab salah/diflag oleh user.
- **Tutor_Questions_API**: Endpoint `/api/tutor/questions` yang merupakan fallback duplikat dari Evaluation_Questions_API.
- **TryoutListClient**: Client component di `src/app/tryout/list/TryoutListClient.tsx`.
- **ExamTemplate**: Model Prisma untuk paket try out (nama, durasi, jumlah soal, cluster).
- **KaTeX**: Library JavaScript untuk merender ekspresi matematika LaTeX di browser.
- **LaTeX**: Format markup matematika, digunakan pada field `text` model `Question` dan `QuestionOption` (contoh: `$x^2 - 4x + 3 = 0$`).
- **XP**: Experience points — representasi progres belajar user, saat ini dihitung hardcode sebagai `totalAttempts * 150`.
- **Streak**: Jumlah hari berturut-turut user aktif belajar, saat ini tidak ada field di DB maupun kalkulasi yang persisten.
- **ExamAttempt**: Model Prisma yang menyimpan satu sesi ujian user.
- **QuestionResponse**: Model Prisma yang menyimpan jawaban user per soal per attempt.

---

## Requirements

### Requirement 1: Auth Middleware & Route Protection

**User Story:** Sebagai pengguna yang belum login, saya ingin agar halaman aplikasi yang memerlukan autentikasi tidak bisa diakses langsung, sehingga data saya dan data user lain tetap aman.

#### Acceptance Criteria

1. THE Middleware SHALL redirect unauthenticated requests to `/auth/login` for all routes under the `/dashboard`, `/analytics`, `/tutor`, `/chancing`, `/counselor`, `/onboarding`, `/settings`, `/evaluation`, `/learning-path`, `/practice`, and `/admin` path prefixes.
2. WHEN an unauthenticated request targets a protected route, THE Middleware SHALL append the original URL as a `callbackUrl` query parameter (URL-encoded) to the redirect URL, e.g. `/auth/login?callbackUrl=%2Fdashboard`.
3. WHEN an authenticated request with `session.user.role !== "ADMIN"` accesses any route under the `/admin` path prefix, THE Middleware SHALL redirect to `/dashboard` with HTTP 307.
4. WHEN an authenticated request with `session.user.role === "ADMIN"` accesses any route under the `/admin` path prefix, THE Middleware SHALL allow the request to proceed without modification.
5. THE Middleware SHALL NOT intercept requests to public routes: `/`, `/auth/login`, `/auth/register`, `/tryout/list`, `/tryout/demo`, all `/api/auth/*` routes, and all `/api/*` routes (API routes handle their own auth).
6. THE Middleware `config.matcher` SHALL use a negative lookahead pattern to exclude `_next/static`, `_next/image`, `favicon.ico`, and all paths starting with `/api/` from middleware execution.
7. WHEN an authenticated (non-admin) user accesses `/onboarding` routes, THE Middleware SHALL allow access — onboarding route protection is handled at the page level, not middleware.

---

### Requirement 2: Tombol Logout Berfungsi

**User Story:** Sebagai user yang sudah login, saya ingin tombol logout di dashboard benar-benar mengeluarkan saya dari sesi, sehingga saya bisa berpindah akun atau meninggalkan perangkat dengan aman.

#### Acceptance Criteria

1. WHEN a user clicks the logout button in the dashboard navigation, THE Dashboard_Nav SHALL call `signOut()` from NextAuth with `{ redirectTo: "/" }` and SHALL handle any errors from `signOut()` by logging them to the console without blocking the user interaction.
2. WHEN `signOut()` is called, THE Next_App SHALL clear the JWT session cookie and redirect the user to the landing page (`/`).
3. THE Dashboard_Nav logout button SHALL have an `onClick` handler that invokes the signOut action — the button SHALL NOT be a non-interactive element without a handler.

---

### Requirement 3: Dashboard Focus-Today — Eliminasi Extra DB Round-Trip

**User Story:** Sebagai developer, saya ingin data "fokus hari ini" pada dashboard tidak memerlukan fetch API terpisah, sehingga dashboard lebih cepat dan tidak ada duplikasi query ke database.

#### Acceptance Criteria

1. THE DashboardPage SHALL derive the `fokusChapter` data from the existing `radarData` computation (lowest-scoring subject) without calling `/api/analytics/focus-today`.
2. THE DashboardPage SHALL pass `fokusChapter` as a prop to DashboardClient, replacing the client-side fetch to `/api/analytics/focus-today`.
3. THE DashboardClient SHALL remove the `useEffect` that fetches `/api/analytics/focus-today` and instead render the `fokusSubject` prop directly for the "Fokus Hari Ini" card.
4. WHEN DashboardPage renders, THE DashboardPage SHALL NOT make more than one query to the `Subject` table and one query to the `SubjectScore` table (queries already present for radar data).
5. WHERE the `/api/analytics/focus-today` endpoint exists, THE endpoint MAY be retained for backward compatibility but SHALL NOT be called by DashboardClient.

---

### Requirement 4: Hapus Endpoint Duplikat `/api/tutor/questions`

**User Story:** Sebagai developer, saya ingin TutorPage menggunakan satu sumber data yang konsisten untuk soal-soal yang perlu dibahas, sehingga tidak ada logika duplikat yang perlu di-maintain di dua tempat.

#### Acceptance Criteria

1. WHEN TutorPage renders without an `attemptId` parameter, THE TutorPage SHALL fetch soal dari `/api/evaluation/questions` sebagai pengganti `/api/tutor/questions`.
2. THE TutorPage SHALL map respons dari `/api/evaluation/questions` ke struktur `WrongQuestion` yang sama seperti yang sudah dipakai saat ini.
3. IF `/api/tutor/questions` route file exists, THEN THE route SHALL be deleted from the codebase.
4. WHEN `/api/evaluation/questions` returns `questions` array, THE TutorPage SHALL display all questions including both incorrectly-answered and flagged questions, consistent with the current behavior of `/api/tutor/questions`.
5. THE Evaluation_Questions_API response field `selectedIds` SHALL be populated correctly so TutorPage can render the selected answer highlight for each question — IF `selectedIds` is absent from the current Evaluation_Questions_API response, THEN THE Evaluation_Questions_API SHALL be updated to include the most recent `selectedIds` per question per user.

---

### Requirement 5: Tryout Template List — Pilih & Mulai Template

**User Story:** Sebagai user, saya ingin melihat daftar paket try out yang tersedia dan memilih salah satunya untuk mulai ujian, sehingga saya bisa berlatih sesuai kebutuhan.

#### Acceptance Criteria

1. THE TryoutListClient SHALL display all `ExamTemplate` records fetched from the database, ordered by name ascending.
2. WHEN a user clicks a template card or the "Mulai" button on a card, THE TryoutListClient SHALL navigate to `/tryout/[id]` where `[id]` is the `ExamTemplate.id`.
3. THE TryoutListClient SHALL display for each template: name, description, duration (in minutes), total items (number of questions), cluster badge (SAINTEK/SOSHUM/CAMPURAN), and an adaptive badge when `isAdaptive` is `true`.
4. WHEN no templates exist in the database, THE TryoutListClient SHALL display an empty-state message indicating that no try out packages are available yet.
5. THE TryoutListPage (server component) SHALL pass templates to TryoutListClient via props — templates SHALL NOT be fetched client-side via `useEffect`.
6. WHEN a user navigates to `/tryout/list` WITHOUT being logged in, THE Middleware SHALL allow access (this is a public route per Requirement 1.5).

---

### Requirement 6: KaTeX Math Rendering

**User Story:** Sebagai siswa, saya ingin soal-soal yang mengandung ekspresi matematika LaTeX tampil sebagai formula yang terbaca, bukan sebagai teks mentah seperti `$x^2 - 4x + 3 = 0$`, sehingga saya bisa memahami soal dengan benar.

#### Acceptance Criteria

1. THE Next_App SHALL install `katex` (as a dependency) and `@types/katex` (as a devDependency) via package manager — `react-katex` SHALL NOT be used due to React 19 compatibility constraints; a custom `MathText` component SHALL wrap `katex.renderToString` directly.
2. THE `MathText` component SHALL be created at `src/components/ui/MathText.tsx` and SHALL accept a `content: string` prop — it SHALL parse the content, split on LaTeX delimiters (`$...$` for inline, `$$...$$` for block), render each LaTeX segment via `katex.renderToString`, and render non-LaTeX segments as plain text nodes.
3. THE CBT_Engine_Page SHALL replace `{currentQ.text}` and `{opt.text}` raw text interpolations with `<MathText content={currentQ.text} />` and `<MathText content={opt.text} />` respectively.
4. THE Review_Page SHALL replace `{currentQ.text}` and `{opt.text}` raw text interpolations with `<MathText content={...} />` in the question text section and options list section.
5. THE TutorPage SHALL replace `{selectedQuestion.text}`, `{q.text}` (card list), and `{opt.text}` (options) raw text interpolations with `<MathText content={...} />`.
6. WHEN `MathText` receives content with no `$` characters, THE component SHALL render the content as a plain `<span>` without calling `katex.renderToString`, preserving performance for non-math text.
7. IF `katex.renderToString` throws a `ParseError` for a malformed LaTeX expression, THEN `MathText` SHALL catch the error and render the original raw segment string inside a `<span>` with `data-katex-error="true"` attribute, without propagating the error to the component tree.
8. THE `MathText` component SHALL set `katex.renderToString` option `throwOnError: false` as an additional safety guard, and `displayMode: true` for `$$...$$` block expressions and `displayMode: false` for `$...$` inline expressions.
9. THE KaTeX CSS SHALL be imported globally in `src/app/globals.css` or `src/app/layout.tsx` via `import 'katex/dist/katex.min.css'` so all rendered formulas are styled correctly.

---

### Requirement 7: Fix `/tryout/demo` 404

**User Story:** Sebagai pengunjung landing page, saya ingin tombol "Coba Demo Gratis" membawa saya ke halaman yang valid, sehingga saya bisa melihat aplikasi tanpa harus mendaftar terlebih dahulu.

#### Acceptance Criteria

1. WHEN a user navigates to `/tryout/demo`, THE Next_App SHALL redirect the user to `/tryout/list` with HTTP 307 (temporary redirect).
2. THE Landing_Page "Coba Demo Gratis" button SHALL navigate to `/tryout/list` directly (updating `router.push` target) in addition to the redirect rule in (1) as defense-in-depth.
3. THE `/tryout/list` page SHALL be accessible without authentication, consistent with Requirement 1.5.

---

### Requirement 8: Dashboard XP & Streak — Kalkulasi Konsisten dari Data Attempt

**User Story:** Sebagai siswa, saya ingin XP dan level saya pada dashboard dihitung secara konsisten berdasarkan aktivitas belajar nyata, bukan nilai hardcode, sehingga progres yang saya lihat akurat dan memotivasi.

#### Acceptance Criteria

1. THE `User` Prisma model SHALL have a new `xp Int @default(0)` field and a new `streak Int @default(0)` field, added via a new Prisma migration with an `npx prisma migrate dev` command.
2. WHEN the Submit_API processes a request, it SHALL first fetch the current attempt to verify `status === "IN_PROGRESS"` before updating XP or streak — IF the attempt already has `status === "COMPLETED"`, THE Submit_API SHALL skip XP/streak updates to prevent double-increment on retries.
3. WHEN a user's attempt status transitions from `IN_PROGRESS` to `COMPLETED`, THE Submit_API SHALL increment `user.xp` by exactly `150` using a Prisma `increment` atomic operation.
4. WHEN a user completes an attempt, THE Submit_API SHALL determine the current date in WIB timezone (UTC+7) by checking whether any other `ExamAttempt` with `status === "COMPLETED"` and `finishedAt` on the same WIB calendar date already exists for that user — IF none exists, THE Submit_API SHALL increment `user.streak` by `1`; IF one exists, THE Submit_API SHALL leave `streak` unchanged.
5. WHEN a user completes an attempt and their most recent previous `COMPLETED` attempt's `finishedAt` was more than 1 WIB calendar day before the current WIB date, THE Submit_API SHALL set `user.streak` to `1` (reset), regardless of the previous streak value.
6. THE DashboardPage SHALL read `user.xp` and `user.streak` from the database and pass them as `xp: number` and `streak: number` props to DashboardClient.
7. THE DashboardClient `Props` interface SHALL replace the implicit XP computation with explicit `xp: number` and `streak: number` props — the hardcoded line `const xp = totalAttempts * 150 || 345` SHALL be removed.
8. THE DashboardClient SHALL compute `level` as `Math.floor(xp / 500) + 1` and `xpProgress` as `((xp % 500) / 500) * 100` from the `xp` prop.
9. THE DashboardClient stats row SHALL include a "Streak" stat card displaying the `streak` value with a flame or lightning icon, replacing or augmenting the existing "Belajar (jam)" stat card.
10. WHEN `xp` is `0` and `streak` is `0` (new user), THE DashboardClient SHALL display `xp` as `0`, level badge as `Lv.1`, and streak as `0` — no fallback value SHALL be used.
