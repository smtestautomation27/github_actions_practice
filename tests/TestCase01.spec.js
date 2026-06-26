import {test, expect, chromium} from '@playwright/test';

test.describe('Test Case 01', () => {
    test.beforeEach('Navigate to the page and check the title', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveTitle('Swag Labs');
    });

    test('Check the login functionality', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Check the add to cart functionality', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('id=add-to-cart-sauce-labs-backpack').click();
        await page.locator('data-test=shopping-cart-link').click();
        await page.locator('id=checkout').click();
        await page.getByPlaceholder('First Name').fill('John');
        await page.getByPlaceholder('Last Name').fill('Doe');
        await page.getByPlaceholder('Zip/Postal Code').fill('12345');
        await page.locator('id=continue').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await page.locator('id=finish').click();
        await expect(page.locator('data-test=complete-header')).toHaveText('Thank you for your order!');
    });

    test('Check the logout functionality', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await page.locator('#react-burger-menu-btn').click();
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
})