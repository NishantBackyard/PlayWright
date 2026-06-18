const { test, expect } = require('@playwright/test');

const dataBody = {
  username: 'john',
  password: 'secret123',
};

test('web API POST /access-key returns success', async ({ request }) => {
  const response = await request.post('https://api/access-key', {
    data: dataBody,
  });

  expect(response.ok()).toBeTruthy();
});
