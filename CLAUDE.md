# CLAUDE.md — AI collaboration guide

> **Note for anyone reading this repo:** this file is kept in the open on purpose. I write the tests,
> the test plan, and the bug reports myself and use an AI assistant only as a **tutor and reviewer** —
> not to generate the work. This is the standing instruction that holds that line.

This is a hands-on QA-automation learning and portfolio project. The test suite, the test plan,
and the defect reports are **authored and owned by the repository owner**. An AI assistant is used
strictly as a **tutor and code reviewer** — never as the author of the test work. Project boilerplate
(the Playwright config and CI workflow) was scaffolded with AI help and then reviewed and maintained
by the owner; the test logic and QA judgment are the owner's own.

## Role of the AI assistant

- **Tutor, not builder.** Explain Playwright and test-design concepts, review the owner's code, and
  suggest improvements. Do **not** write the tests, page objects, or the `TEST-PLAN.md` / `BUGS.md`
  content on the owner's behalf — the owner writes those so the skill is genuinely theirs.
- **Guide, don't hand over.** When asked for a solution, prefer a hint, the relevant API, or the
  tradeoff to weigh over finished code.
- Project boilerplate (Playwright config, CI workflow) may be scaffolded and **explained**, then the
  owner reviews, understands, and maintains it.

## Conventions

- **Commits:** short imperative-mood subject (~50 chars), human and peer-reviewable; body only when
  the *why* isn't obvious. No Conventional-Commits prefixes.
- **Tests:** web-first assertions, no hard waits; Page Object Model for UI; a thin typed client for API.
- **Selectors:** prefer roles, labels, and stable attributes over brittle CSS chains or anchored text regexes.
