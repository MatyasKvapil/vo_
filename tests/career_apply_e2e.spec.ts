const { test, expect } = require('@playwright/test');
const { queryDB } = require('../db');
const { formData } = require('../ds/formData');
require('dotenv').config();


test('open career page, check if consent checkbox warning is shown if not true', async ({ page }) => {
    await page.goto(process.env.APP_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Domů | Viable One');
    
    await page.getByRole('navigation').getByRole('link', { name: 'Kariéra' }).click();
    await expect(page).toHaveTitle('Kariéra | Viable One');

    const consentCheckbox = page.locator('input#gdpr');
    const submitBtn = await page.locator('button[type="submit"]');
    if (await consentCheckbox.isChecked()) {
        await consentCheckbox.uncheck();
    }
    await submitBtn.click();

    await expect(page.locator('p.invalid-feedback')).toBeVisible();
});

test('form fill and submit', async ({ page }) => {
    await page.goto(`${process.env.APP_URL}/career`, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Kariéra | Viable One');

    await page.locator('[name="name"]').scrollIntoViewIfNeeded();
    await page.locator('[name="name"]').fill(formData.name);
    await page.locator('[name="email"]').fill(formData.email);
    await page.locator('[name="phone"]').fill(formData.phone);
    await page.locator('#cvFile').setInputFiles(formData.cvFilePath);
    await page.locator('[name="message"]').fill(formData.message);
    await page.locator('#gdpr').check();

    await page.locator('button[type="submit"]').click();

    const okBtn = page.locator('button', { hasText: 'OK' });
    await expect(okBtn).toBeVisible();
    await okBtn.click();
    await expect(okBtn).toBeHidden();
});

// test('data validation', async ({ }) => {
//     const dbResult = await queryDB('select * from information_schema.tables');
//     console.log(dbResult)
//     // Clean up test data
// });

