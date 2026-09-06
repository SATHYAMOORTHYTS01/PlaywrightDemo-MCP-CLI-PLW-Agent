import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { CrmHomePage } from './pages/CrmHomePage';
import { CreateLeadPage } from './pages/CreateLeadPage';
import { createLeadData } from './test-data/leadData';

test.describe('Successful Lead Creation', () => {
  test('Create a Lead with valid mandatory data and verify successful creation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const crmHomePage = new CrmHomePage(page);
    const createLeadPage = new CreateLeadPage(page);
    const lead = createLeadData();

    await loginPage.goto();
    await expect(loginPage.heading).toHaveText('Leaftaps Login');
    await loginPage.login('democsr2', 'crmsfa');
    await expect(page.getByRole('heading', { name: 'Welcome Demo B2C CSR' })).toBeVisible();

    await crmHomePage.openCrm();
    await expect(page).toHaveTitle(/My Home \| opentaps CRM/);
    await expect(crmHomePage.leadsLink).toBeVisible();

    await crmHomePage.openLeads();
    await crmHomePage.openCreateLead();
    await expect(page).toHaveTitle(/Create Lead \| opentaps CRM/);
    await expect(createLeadPage.submitButton).toBeVisible();

    await createLeadPage.fillRequiredFields(lead);
    await createLeadPage.submit();

    await expect(createLeadPage.successMessage).toBeVisible();
    await expect(createLeadPage.resultText).toContainText(lead.companyName);
    await expect(createLeadPage.resultText).toContainText(lead.firstName);
    await expect(createLeadPage.resultText).toContainText(lead.lastName);
  });
});
