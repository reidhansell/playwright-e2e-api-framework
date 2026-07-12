import { test, expect } from '@playwright/test';

// AI-generated smoke test (free scaffold).
test.describe('API smoke', () => {
  test('products-list endpoint responds', async ({ request }) => {
    const response = await request.get('/api/productsList');
    await expect(response).toBeOK();
  });
});

// ─── My tests ───────────────────────────────────────────────────────────────
test.describe('Login API', () => {
  // This API returns HTTP 200 even on errors; the real code is in responseCode, so we assert the body

  test('valid credentials are accepted', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
      form: { email: 'reid@test.test', password: 'test' },
    });
    const body = await response.json();
    expect(body.responseCode).toBe(200);
  });
  test('invalid credentials are rejected', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
      form: { email: 'reid@test.test', password: 'etst' },
    });
    const body = await response.json();
    expect(body.responseCode).toBe(404);
  });
});
