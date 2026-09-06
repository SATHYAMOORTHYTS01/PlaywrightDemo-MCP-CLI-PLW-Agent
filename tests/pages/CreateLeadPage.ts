import { expect, Page } from '@playwright/test';
import type { LeadData } from '../test-data/leadData';

export class CreateLeadPage {
  private readonly companyName = this.page.locator('#createLeadForm_companyName');
  private readonly firstName = this.page.locator('#createLeadForm_firstName');
  private readonly lastName = this.page.locator('#createLeadForm_lastName');
  readonly submitButton = this.page.getByRole('button', { name: 'Create Lead' });
  readonly successMessage = this.page.getByText('View Lead', { exact: true });
  readonly resultText = this.page.locator('body');

  constructor(private readonly page: Page) {}

  async fillRequiredFields(lead: LeadData): Promise<void> {
    await this.companyName.fill(lead.companyName);
    await this.firstName.fill(lead.firstName);
    await this.lastName.fill(lead.lastName);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
    await expect(this.page).not.toHaveTitle(/Create Lead \| opentaps CRM/);
  }
}
