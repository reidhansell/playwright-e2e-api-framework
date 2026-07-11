# Defects Found

---

## BUG-001 — Signup accepts unvalidated field data

- **Severity:** Medium _(Low as-is on this demo — see Description)_
- **Description:** The "Enter Account Information" step of signup checks required fields for _presence_ but never for _format_. Every free-text field (Zipcode, Mobile, State, City, Address, First/Last name, etc.) accepts arbitrary values like `test`, and the account is created with no validation error. This is a data-quality defect, not a security or availability one — non-blocking and correctable after the fact, but bad data is persisted _silently_ (the user is never told anything is wrong). Impact is **Low on this demo** (the data goes nowhere — no fulfillment), but **Medium against a real retailer**, where invalid shipping/contact data breaks order fulfillment downstream (TEST-PLAN §8 "with a real product" lens) — which is where the Medium rating comes from.
- **Environment:** 2026-07-09, Windows 11, Chrome, https://automationexercise.com, no app version (hosted third-party SUT)
- **Prerequisites:**
  - Not logged in — the "New User Signup!" entry point is only shown to logged-out visitors.
  - An email address that is not already registered (a used one triggers "Email Address already exist!" and blocks signup).
- **Steps to reproduce:**
  1. Go to https://automationexercise.com/login
  2. Under "New User Signup!", enter a Name and a fresh (unregistered) email, click **Signup**
  3. On the "Enter Account Information" page, complete the whole form:
     - Title: Mr.
     - Password: test
     - Date of Birth: 2 / February / 2020
     - First name: test
     - Last name: test
     - Company: test
     - Address: test
     - Address 2: test
     - Country: United States
     - State: test
     - City: test
     - Zipcode: test
     - Mobile Number: test
  4. Click **Create Account**
  5. Observe redirect to `/account_created` showing **"Account Created!"**
- **Expected** _(inferred — no published spec; based on standard field-format conventions):_ fields with a well-known format — Zipcode and Mobile Number especially — reject clearly-invalid values (e.g. `test`) with a validation message, and the account is not created until the format is valid.
- **Actual:** every free-text field accepts arbitrary text; the account is created with invalid data; no validation error is shown.
- **Evidence:**
  - [Recorder replay — import into Chrome DevTools → Recorder](bugs/media/BUG-001/BUG-001.json)

---
