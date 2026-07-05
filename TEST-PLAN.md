# Test Plan — Automation Exercise

> **Owner: Reid.** This is the senior-signaling artifact — write it the way you'd have written a test
> plan at Akerna. The skeleton below is a scaffold; the judgment (what to test first and *why*) is the point.

## 1. Scope

- **In scope:** _(fill in — e.g. account signup/login, product browse/search, cart, checkout, contact form; UI + documented REST API)_
- **Out of scope:** _(e.g. payment-processor internals, third-party ad frames, performance/load, visual regression)_

## 2. Risk-based prioritization

_Which areas get tested first, and why. Rank by business risk × likelihood of breakage._

| Priority | Area | Why it's high/low risk |
|---|---|---|
| P0 | _e.g. login / auth_ | _gates every other flow_ |
| P1 | _e.g. cart → checkout_ | _revenue path_ |
| P2 | _..._ | _..._ |

## 3. Test types

- **Smoke** — _..._
- **E2E (UI journeys)** — _..._
- **API** — _..._
- **Negative / validation** — _..._

## 4. Environments

- SUT: `https://automationexercise.com` (shared third-party host)
- Browsers: Chromium, Firefox, WebKit
- CI: GitHub Actions (Ubuntu, Node 20)

## 5. Entry / exit criteria

- **Entry:** _..._
- **Exit:** _..._
