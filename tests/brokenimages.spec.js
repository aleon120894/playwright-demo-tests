import { test, expect } from '@playwright/test';

test('check broken images', async ({ page, request }) => {
  const baseURL = 'https://the-internet.herokuapp.com';
  await page.goto(`${baseURL}/broken_images`);

  const images = await page.$$('img');

  for (const img of images) {
    let src = await img.getAttribute('src');

    if (src && !src.startsWith('http')) {
      src = baseURL + src;
    }

    const response = await request.get(src);
    expect(response.status()).not.toBe(404);

    const naturalWidth = await img.evaluate(el => el.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  }
});

