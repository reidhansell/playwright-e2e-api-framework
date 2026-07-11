import { test, expect } from '@playwright/test';

/**
 * API tests for Automation Exercise — the "worked scaffold" for the API side of the suite,
 * mirroring tests/e2e/home.spec.ts on the UI side.
 *
 * Playwright ships its own HTTP client: the `request` fixture (an APIRequestContext). No extra
 * tooling — same runner, same config `baseURL`, same CI, same HTML report as the E2E tests.
 * That is what makes this "E2E + API in one framework" rather than two things bolted together.
 *
 * Endpoint reference (the SUT publishes its API): https://automationexercise.com/api_list
 *
 * Working agreement: the connectivity smoke below is the table-stakes plumbing (like the home
 * smoke). The real coverage — the two `fixme`'d tests — is YOURS to author; that is the résumé bullet.
 */
test.describe('API — authentication', () => {
  // Connectivity smoke: proves the `request` fixture reaches the API and gets a response back.
  // Minimal + stable on purpose — the first green API test, same role home.spec.ts plays for the UI.
  test('products-list endpoint responds', async ({ request }) => {
    const response = await request.get('/api/productsList');
    await expect(response).toBeOK(); // any 2xx
  });

  // --- item 3, positive: valid login → the API confirms the user -------------------------------
  // TODO(Reid): POST to /api/verifyLogin with a valid email + password (an account you created).
  //   Assert on the RESPONSE BODY, not just the HTTP status: parse it with `await response.json()`
  //   and check the field that signals success. This is exactly your Postman "assert the body"
  //   judgment — same skill, new vehicle.
  test.fixme('valid credentials are accepted', async ({ request }) => {
    // starting point: request.post('/api/verifyLogin', { form: { email: '...', password: '...' } })
  });

  // --- item 3, negative: bad request → the API rejects it --------------------------------------
  // TODO(Reid): POST to /api/verifyLogin missing a required field (e.g. no password), assert the
  //   API reports the error. Worth discovering as you go: check what this API returns for a bad
  //   request at the HTTP-status layer vs inside the JSON body — it may not be what you'd expect,
  //   and noticing that gap is a strong contract-testing talking point in a screen.
  test.fixme('a malformed request is rejected', async ({ request }) => {
    // starting point: request.post('/api/verifyLogin', { form: { email: '...' } }) // note: no password
  });
});
