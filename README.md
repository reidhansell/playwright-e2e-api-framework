# Playwright QA Suite — Automation Exercise

End-to-end and API test framework for [automationexercise.com](https://automationexercise.com),
built with **Playwright + TypeScript**. Cross-browser (Chromium / Firefox / WebKit), page-object
structured, and run in CI on every push.

> **Status:** in active development. Start with [`TEST-PLAN.md`](./TEST-PLAN.md) (scope + risk-based
> prioritization) and [`BUGS.md`](./BUGS.md) (defects found while building the suite).

## Stack

- [Playwright Test](https://playwright.dev/) (`@playwright/test`) — runner, assertions, fixtures, projects
- TypeScript, Node 20+
- Page Object Model for UI; a thin typed client for API tests
- GitHub Actions CI — cross-browser matrix, HTML report uploaded as an artifact

## Running locally

```bash
npm install
npx playwright install          # one-time: download browsers
npm test                        # full cross-browser suite
npm run test:chromium           # chromium only (fast)
npm run test:ui                 # interactive UI mode
npm run report                  # open the last HTML report
```

## Layout

```
tests/e2e/     UI user-journey tests
tests/api/     REST API tests
pages/         Page Objects (UI)
api/           typed API client wrapper
fixtures/      auth/state fixtures, test data
```

## Design decisions

- **Web-first assertions, no hard waits** — every assertion auto-waits; `page.waitForTimeout` is banned.
- **Retries on CI only** — the system under test is third-party, so CI retries (2x) keep a transient
  site blip from reading as a real regression; local runs use 0 retries to surface flake immediately.
- **Trace on first retry** — a full trace is captured when a test retries, so CI failures are debuggable
  from the uploaded artifact alone.
