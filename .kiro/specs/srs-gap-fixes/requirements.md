# Requirements Document

## Introduction

This spec covers the remaining gaps between the Polarius UTBK app's SRS v2.0 and the current codebase. After a full audit of the existing code, many previously-identified gaps have already been resolved. This document captures the **genuinely open gaps** that still need implementation:

1. **Auth Middleware** — No route protection exists; all pages are accessible without login and admin pages have no role check.
2. **Tutor Wrong Questions API** — The AI Tutor page fetches questions via a workaround (admin questions endpoint) instead of the student's actual wrong answers from their latest attempt.
3. **Tutor Session Persistence** — The `tutor/page.tsx` never passes `questionId` to `/api/tutor/ask`, so `TutoringSession` and `TutoringMessage` records are never created from the tutor page.
4. **Adaptive Exam Engine** — Templates marked `isAdaptive: true` still use static question ordering instead of the Fisher-information-based adaptive selector.
5. **LaTeX/Math Rendering** — Question text containing LaTeX (e.g., `$x^2 - 4x + 3 = 0$`) is displayed as raw text in the CBT UI.

## Glossary

- **System**: The Polarius UTBK Next.js application.
- **Middleware**: Next.js `middleware.ts` file that runs before route handlers to enforce authentication and authorization.
- **Student**: An authenticated user with `role = STUDENT`.
- **Admin**: An authenticated user with `role = ADMIN`.
- **ExamAttempt**: A database record representing one student's attempt at an `ExamTemplate`.
- **QuestionResponse**: A database record storing a student's answer to one question within an `ExamAttempt`.
- **TutoringSession**: A database record grouping all AI tutor messages for a specific student–question pair.
- **TutoringMessage**: A database record storing one message (user or assistant) within a `TutoringSession`.
- **SubjectScore**: A database record storing per-subject IRT scores for a completed `ExamAttempt`.
- **IRT**: Item Response Theory — the scoring model used to estimate student ability (θ).
- **θ (theta)**: The IRT ability estimate for a student, stored in `user.irtAbility`.
- **Scaffold Level**: The AI Tutor's current help level: `SOCRATIC` → `HINT` → `SOLUTION`.
- **Fisher Information**: A measure of how much information a question provides about a student's ability, used for adaptive item selection.
- **Wrong Question**: A `QuestionResponse` where `isCorrect = false` from the student's latest completed `ExamAttempt`.
- **Protected Route**: A URL path that requires an authenticated session to access.
- **Admin Route**: A URL path under `/admin/*` that requires `role = ADMIN`.

---

## Requirements

### Requirement 1: Auth Middleware — Route Protection

**User Story:** As a student, I want unauthenticated users to be redirected to the login page when they try to access protected pages, so that my data and the platform's content are secure.

#### Acceptance Criteria

1. WHEN an unauthenticated user navigates to any route under `/dashboard`, `/tryout`, `/analytics`, `/chancing`, `/tutor`, or `/onboarding`, THE Middleware SHALL redirect the request to `/auth/login`.
2. WHEN an unauthenticated user navigates to any route under `/admin`, THE Middleware SHALL redirect the request to `/auth/login`.
3. WHEN an authenticated user with `role = STUDENT` navigates to any route under `/admin`, THE Middleware SHALL redirect the request to `/dashboard`.
4. WHEN an authenticated user navigates to `/auth/login` or `/auth/register`, THE Middleware SHALL redirect the request to `/dashboard`.
5. THE Middleware SHALL allow unauthenticated access to `/`, `/auth/login`, `/auth/register`, and all `/api/auth/*` routes without redirection.
6. THE Middleware SHALL allow unauthenticated access to all static assets and Next.js internal routes (`/_next/*`, `/favicon.ico`).

---

### Requirement 2: Tutor Wrong Questions API

**User Story:** As a student, I want the AI Tutor to show me the questions I actually got wrong in my latest try-out, so that I can focus my review on my real weaknesses.

#### Acceptance Criteria

1. THE System SHALL expose a `GET /api/tutor/wrong-questions` endpoint that returns wrong questions from the authenticated student's latest completed `ExamAttempt`.
2. WHEN the endpoint is called by an authenticated student who has at least one completed attempt, THE System SHALL return up to 10 `QuestionResponse` records where `isCorrect = false`, ordered by `answeredAt` descending, from the most recent completed attempt.
3. WHEN the endpoint is called by an authenticated student who has no completed attempts, THE System SHALL return an empty array with HTTP 200.
4. WHEN the endpoint is called by an unauthenticated user, THE System SHALL return HTTP 401.
5. THE System SHALL include in each returned item: `questionId`, `questionText`, `subjectName`, `difficulty`, `selectedIds`, `correctOptionIds`, `correctOptionText`, and `timeSpent`.
6. WHEN `tutor/page.tsx` mounts, THE Tutor_Page SHALL fetch wrong questions from `GET /api/tutor/wrong-questions` instead of the admin questions endpoint.
7. WHEN the wrong questions list is empty, THE Tutor_Page SHALL display a prompt directing the student to complete a try-out first.

---

### Requirement 3: Tutor Session Persistence

**User Story:** As a student, I want my AI Tutor conversations to be saved, so that I can review past explanations and the system can track my learning progress.

#### Acceptance Criteria

1. WHEN a student selects a question in the AI Tutor and sends their first message, THE Tutor_Page SHALL include the `questionId` in the request body sent to `POST /api/tutor/ask`.
2. WHEN `POST /api/tutor/ask` receives a request with a valid `questionId` and an authenticated session, THE Tutor_API SHALL create or retrieve a `TutoringSession` record for that `(userId, questionId)` pair.
3. WHEN a `TutoringSession` is created or retrieved, THE Tutor_API SHALL persist the student's message as a `TutoringMessage` with `role = USER`.
4. WHEN the AI response is generated, THE Tutor_API SHALL persist the assistant's response as a `TutoringMessage` with `role = ASSISTANT`.
5. IF the database write fails, THEN THE Tutor_API SHALL still return the AI response to the client without surfacing the DB error to the user.

---

### Requirement 4: Adaptive Exam Engine

**User Story:** As a student, I want adaptive try-outs to dynamically select questions based on my current ability estimate, so that I get a more accurate and efficient assessment.

#### Acceptance Criteria

1. WHEN `/api/tryout/start` is called for a template where `isAdaptive = true`, THE Start_API SHALL use the adaptive item selection algorithm instead of static ordering.
2. WHEN selecting the first question for an adaptive exam, THE Start_API SHALL select the question with difficulty closest to `θ = 0` (the population mean).
3. WHEN selecting subsequent questions for an adaptive exam, THE Start_API SHALL call `selectNextItem()` from `src/lib/irt/adaptive.ts`, passing the current θ estimate and the IDs of already-answered questions.
4. WHEN an adaptive exam is in progress and the student submits an answer, THE System SHALL update the online θ estimate using `updateThetaOnline()` from `src/lib/irt/adaptive.ts`.
5. WHEN an adaptive exam is in progress, THE Start_API SHALL return questions one at a time rather than all at once.
6. WHILE an adaptive exam is in progress, THE CBT_Page SHALL fetch the next question from the API after each answer submission.
7. WHEN an adaptive exam reaches the `totalItems` count defined in the `ExamTemplate`, THE System SHALL finalize the attempt and calculate final scores.

---

### Requirement 5: LaTeX/Math Rendering in CBT

**User Story:** As a student, I want mathematical expressions in questions to be rendered properly, so that I can read and understand the questions correctly.

#### Acceptance Criteria

1. WHEN a question's `text` field contains LaTeX delimiters (`$...$` for inline or `$$...$$` for block), THE CBT_Page SHALL render the expression using a math rendering library instead of displaying raw LaTeX text.
2. WHEN a question option's `text` field contains LaTeX delimiters, THE CBT_Page SHALL render the expression correctly within the option button.
3. WHEN the review page displays question text or option text containing LaTeX, THE Review_Page SHALL render the expressions correctly.
4. IF a LaTeX expression fails to parse, THEN THE System SHALL display the raw text as a fallback without crashing.
