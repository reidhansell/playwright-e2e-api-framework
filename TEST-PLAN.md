# Test Plan — Automation Exercise

My test plan for automationexercise.com. It's organized around one idea: I spend testing effort in
proportion to risk. Every section below is that one judgment from a different angle.

## How this is organized

Everything here follows from one principle — **effort goes where the risk is.** The sections aren't
independent templates to fill in; they're a single risk judgment projected five ways:

1. **Surfaces** — where the product can fail, grouped by who consumes each one (end users vs.
   developers). Different consumer, different surface, different tests.
2. **Feature inventory** — per surface, what a consumer does, organized into domain clusters (UI by user
   goal, API by resource) with the atomic actions nested inside. The nested items are _predictions_ of
   where a feature might later split by risk — structural only, no risk yet.
3. **Risk-based prioritization** — rank by impact × likelihood, resolving the inventory into rows where
   **one row = one shared risk profile.** Coarse features split apart where their nested parts diverge in
   risk; fine or same-domain items group together where they share it. This is the only place risk enters,
   and the only place the grain changes.
4. **Test types** — functional is the broad baseline across every feature; each non-functional type
   (security, performance, …) attaches only to the specific features where that risk actually lives.
   Not every type on every feature.
5. **Out of scope** — the test types I deliberately skip, each with a reason. Expectation-setting, not
   filler.

**One scope note.** This plan covers a single test _level_ — black-box end-to-end and API — because the
SUT is a third-party app I have no source access to. Unit and integration levels aren't available to me
here; I can only test it from the outside. With a real codebase I'd also decide test _level_ and push
most coverage down to unit/integration, keeping E2E for the critical journeys. That's out of scope here
by constraint, not by oversight.

<!-- Notes to self on why the structure is shaped this way:
     - The "infinite number of things to test" problem is real, but it lives at the test-CASE level, below
       scope. Scope works at the feature and (feature x type) level, both finite. Case count is controlled
       by risk depth in section 4.1, not by listing cases out.
     - Feature grain: stop where a user would name the goal ("log in", not "focus the email field"). Only
       split a feature in section 3, and only when the halves carry different risk.
     - Out of scope isn't guesswork: walk the standard quality menu once (ISO 25010 / ISTQB), and whatever
       I skip with a reason becomes the out-of-scope list. -->

## 1. Surfaces (by consumer)

<!-- A surface is a place the product can fail, grouped by who depends on it; a defect only hurts whoever
     consumes it. Confirm in/out, add rows if there turn out to be more than two. -->

| Surface      | Consumer                                                   | In / out of scope |
| ------------ | ---------------------------------------------------------- | ----------------- |
| UI (web app) | end users (a developer using the site is just a user here) | in                |
| REST API     | developers / integrators — no UI                           | in                |

## 2. Feature inventory (per surface)

_What a consumer would say they came to do, organized into domain clusters (UI by goal, API by resource). Coarse — risk-splitting happens in section 3._

<!-- Structure and grain:
     - Organize each surface into domain clusters with the atomic actions nested inside: UI by user goal
       (the "buy products" cluster holds add to cart / view cart / check out), API by resource (the
       "account" cluster holds create / update / delete). Same shape on both surfaces.
     - The nested items are PREDICTIONS of where a feature might split by risk in section 3 — not
       decisions. No ranking and no risk here; this stage is structural only.
     - Completeness cross-check between the surfaces, but it is directional: a documented API op almost
       always has a matching UI feature (strong), while a UI feature often has NO documented endpoint
       (weak) — the published API is a curated subset, not every HTTP call, so review / contact / subscribe
       are UI-only. If the whole list for a full e-commerce site fits on one hand, I under-explored — walk
       the live site before trusting it. -->

### 2.1 UI (end users)

1. **I can make an account** (sign up, sign in, sign out, delete account, update account)
2. **I can browse products** (view catalog, filter by category / brand, search, view product, review product) _[no sorting]_
3. **I can buy products** (add to cart, view cart, check out)
4. **I can engage with the retailer** (contact us, subscribe) _[no company information]_

_Parens hold the pre-splits (predictions); brackets mark expected features the site lacks._

### 2.2 REST API (developers)

Base `https://automationexercise.com/api` — the endpoints below are the full documented set.

- **Products:** `/productsList`, `/brandsList`, `/searchProduct`
- **Auth:** `/verifyLogin`, `/getUserDetailByEmail`
- **Account:** `/createAccount`, `/deleteAccount`, `/updateAccount`

_The UI form-submission features (review, contact, subscribe, checkout, …) have no published endpoint — tested via the UI._

## 3. Risk-based prioritization

_Ranked by **impact × likelihood**, resolved into rows where one row = one shared risk profile. Coarse features split here where their parts diverge in risk; fine or same-domain items group. This ordering is the plan._

<!-- What a ROW is: one shared risk profile, not one inventory entry. Resolve section 2 into rows by
     splitting a coarse feature where its nested parts diverge in risk (check out splits off "buy
     products"), and grouping fine / same-domain items where they share it (the three catalog reads =
     one row). The pre-splits from section 2 were predictions; real risk confirms or overrides them here.
     Finding the splits is mechanical, not a stare: walk each cluster's section-2 pre-splits and fail each
       child in turn — when one child's failure is far worse or far likelier than its siblings, it wants
       its own row (add to cart = annoyance vs. check out = lost sale). Judging a feature as one blob hides
       its worst part; the average washes the outlier out.

     Priority = Impact × Likelihood. Priority is the OUTPUT (the answer); impact and likelihood are the
       two INPUTS (the work). Assess the two inputs independently and FIRST, then let priority fall out —
       don't pick a priority and backfill impact to match, or impact just becomes a copy of priority.
       Because likelihood modulates it, a high-impact / low-likelihood row can rank BELOW a medium-impact /
       high-likelihood one (delete account vs. search) — that is why impact and priority are not one column.
     Impact = how bad if it breaks: revenue / auth / PII / destructive / blocks-downstream beats cosmetic.
     Likelihood = how much room there is to go wrong (step count, input / validation surface, integrations).
       The site is deployed and "works," so likelihood is not "recently changed" — it's how edge-case-rich
       the area is.
     API risk lens: read-only public data = low; touches auth, PII, or changes / destroys state = high.
     Frequency of use is NOT likelihood — heavy traffic on a stable feature is blast radius, which belongs
       in impact.
     Don't rank everything P0 (if all of it is critical, none of it is). The reasoning list below the table is the deliverable. -->

| Priority | Feature                        | Surface | Impact | Likelihood |
| -------- | ------------------------------ | ------- | ------ | ---------- |
| P0       | I can check out                | UI      | H      | H          |
| P0       | Auth                           | API     | H      | H          |
| P1       | I can make an account          | UI      | H      | L          |
| P1       | I can browse products          | UI      | M      | H          |
| P1       | Products                       | API     | M      | H          |
| P1       | Account                        | API     | H      | L          |
| P2       | I can manage my cart           | UI      | L      | M          |
| P2       | I can engage with the retailer | UI      | L      | L          |

**Why these ranks**

_Ranking principle: proximity to the revenue path — how directly a failure blocks a user from buying — with data-safety (PII, destructive ops) as the second axis._

- **I can check out (P0):** The revenue transaction itself — multi-step, payment + address, irreversible. Highest stakes and the most failure surface on the site.
- **Auth — API (P0):** The credential gate for the whole account + buying path, and the only endpoint touching auth secrets — so high stakes and high breakage surface.
- **I can make an account (P1):** Prereq to buying, so it gates revenue — high stakes. But a simple flow a user hits once, so it rarely breaks.
- **I can browse products (P1):** Top of the funnel — a break dents discovery but doesn't block buying. Highest-traffic feature, and search / filter give it real breakage surface.
- **Products — API (P1):** Public catalog reads — no revenue block, no PII. Search takes free input, so it's the one with real breakage surface.
- **Account — API (P1):** PII writes plus a destructive delete — sensitive on data-safety, not revenue. But simple CRUD, so it rarely breaks.
- **I can manage my cart (P2):** Add / view cart — reversible, no money or PII. A break is an annoyance, not lost revenue.
- **I can engage with the retailer (P2):** Off the revenue path; contact aside, hardly a feature at all.

## 4. Test types

### 4.1 Functional (baseline)

_Applies to every ranked feature — positive plus negative/validation, depth set by the feature's rank._

<!-- Functional is the one broad type, and this section is MECHANICAL — it derives straight from the
     section-3 ranks, no new judgment. Depth-by-rank is how risk sets case count without enumerating cases
     here; the actual case list gets written when the tests do, not in the plan. -->

Mechanical — this falls straight out of the section-3 ranks, no new decisions. Depth by rank:

- **P0** (check out, Auth) — positive path + several negative / edge / boundary cases.
- **P1** — positive path + the key negatives.
- **P2** — a single happy-path smoke.

### 4.2 Non-functional (targeted)

_Each type attaches to specific features, only where that quality carries real risk. Most features get none._

<!-- Walk the quality menu once. Each TYPE lands in exactly one of two tables: attach it to the feature(s)
     where its risk lives (a row here, cell-level "type → target"), or, if it attaches nowhere, drop it to
     section 5 as one disclaimed line (the whole type, all features at once). This partitions the ~7 TYPES,
     NOT the type × feature grid — so it stays additive, not M × N: features get named only inside the types
     you include, never crossed against the ones you exclude.

     Menu: performance, security, accessibility, compatibility, usability, reliability, localization. -->

| Type          | Target feature(s)              | Why it's warranted here                                                                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Security      | Auth, Account                  | Credential handling + PII. Black-box testable: bad-cred rejection, no info leak on failure, injection in auth fields, session behavior.       |
| Accessibility | check out, browse (primary UI) | Legal exposure (WCAG / ADA) concentrates on the high-traffic revenue path, not minor forms. Testable black-box via axe-core on the DOM.        |
| Compatibility | all features                   | Already covered — the Chromium / Firefox / WebKit project matrix runs every test on three engines. Built into the config, not a separate pass. |

## 5. Out of scope

_Test types I'm deliberately not running, each with a reason — so a gap reads as a decision, not an oversight._

<!-- The menu types NOT attached in section 4.2 land here — each disclaimed in ONE line (whole type, all
     features), plus any scope boundaries (payment-processor internals, third-party ad frames). Always
     type-level, never a per (type × feature) cell — that is what keeps it additive, not M × N. Purpose is
     expectation management: turn "he forgot X" into "he consciously skipped X because ..." — so list what a
     reader might reasonably expect on an e-commerce site, not the absurd. -->

| Excluded                                 | Why                                                                                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Performance / load                       | Third-party host — can't (and shouldn't) load-test infra I don't own; observed page-load is dominated by their ad networks, not the SUT.          |
| Reliability (fault-tolerance / recovery) | Black-box third-party site — no way to inject faults or test recovery. (Data correctness across create/update/delete is functional, section 4.1.) |
| Usability                                | A manual / UX discipline; not meaningfully automatable in this suite.                                                                             |
| Localization                             | Single-locale (English) site — no i18n to exercise.                                                                                               |
| Payment / checkout security              | Demo site with no real payment processor — payment security is untestable fiction. (Access control on checkout folds into Auth.)                  |
| Third-party ad / tracking frames         | Not part of the SUT — out of my control and not my product to test.                                                                               |

## 6. Environments

- **SUT:** `https://automationexercise.com` — shared third-party host (occasional downtime; CI retries absorb transient blips).
- **Browsers:** Chromium, Firefox, WebKit — Playwright project matrix.
- **CI:** GitHub Actions on `ubuntu-latest`, Node 20 — `npm ci` → `npx playwright install --with-deps` → `npx playwright test`; 2 retries on CI, trace on first retry, HTML report uploaded as an artifact (14-day retention).

## 7. Entry / exit criteria

<!-- Entry = what has to be true before a test cycle counts (SUT reachable, deps installed, suite green
     locally). Exit = when the cycle is done (P0/P1 automated and green across the matrix, defects logged
     in BUGS.md, no open Blocker/Critical). Keep it honest to what this repo actually gates on. -->

**Entry** — a test cycle only counts once:

- the SUT (automationexercise.com) is reachable;
- dependencies and Playwright browsers are installed (`npm ci` → `npx playwright install`);
- the suite passes locally before push.

**Exit** — the cycle is complete and the suite is shippable once:

- every P0 / P1 feature has automated coverage;
- all tests pass across the Chromium / Firefox / WebKit matrix;
- defects found are written up in `BUGS.md`;
- no open Blocker or Critical defects remain.

## 8. With a real product — what changes

This SUT is black-box, third-party, and a demo, which pushes most non-functional testing out of scope (section 5) for reasons of _access_, not importance. Against a real product I owned, the plan would grow exactly where it's thin here:

- **Test levels (the big one).** With source access I'd push most coverage _down the pyramid_ — unit + integration for logic and contracts (fast, cheap, precise) — and reserve E2E for the critical revenue journeys. Black-box, I can only test from the outside, so everything here is E2E / API.
- **Performance & load.** Real load / stress testing against my own infra (k6 / JMeter), with latency and throughput targets on check out and search. Load-testing someone else's host is abuse, so it's off the table here.
- **Payment & data security.** Real payment-flow security (tokenization, PCI boundaries), authorization, and data-at-rest — all need a real processor and backend access a demo doesn't have.
- **Reliability.** Fault injection, failover, and recovery testing once I control the environment.
- **Accessibility & i18n.** A full WCAG audit across the app, and real localization testing if it shipped multiple locales.

## Appendix — the algorithm, start to finish

The repeatable procedure behind this plan, in order — so I can re-run it on any product. One rule underneath all of it: **effort ∝ risk.** Each step's finer detail lives in the linked section.

1. **Surfaces, by consumer** (§1) — where the product can fail, grouped by who depends on it (end users → UI, developers → API). A defect only hurts that surface's consumer.
2. **Feature inventory, per surface** (§2) — what a consumer does, at user-goal grain, in domain clusters with atomic actions nested as _predictions_. No risk yet. Cross-check the surfaces (documented API → UI is a strong signal; UI → API is weak).
3. **Risk ranking** (§3) — Priority = Impact × Likelihood; assess the two inputs first and let priority fall out. One row = one shared risk profile: **split** a cluster where a child's failure is worse or likelier than its siblings (fail-each-child), **group** where they share risk.
4. **Functional coverage** (§4.1) — mechanical: every feature, depth = its rank (P0 deep, P2 a smoke).
5. **Non-functional, targeted** (§4.2) — walk the quality menu once; each type either attaches to the feature(s) where its risk lives, or drops to §5. Targeted, never type × feature.
6. **Out of scope** (§5) — the un-attached types + scope boundaries, each with a reason (expectation management). Silence covers everything else.
7. **Environments + entry/exit** (§6–7) — where it runs, plus the objective gates for "ready to test" and "done testing."
