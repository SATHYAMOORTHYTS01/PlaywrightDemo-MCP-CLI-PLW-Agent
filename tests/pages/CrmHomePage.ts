import { Page } from '@playwright/test';

export class CrmHomePage {
  readonly leadsLink = this.page.getByRole('link', { name: 'Leads' });
  private readonly crmLink = this.page.getByRole('link', { name: 'CRM/SFA' });
  private readonly createLeadLink = this.page.getByRole('link', { name: 'Create Lead' });

  constructor(private readonly page: Page) {}

  async openCrm(): Promise<void> {
    await this.crmLink.click();
  }

  async openLeads(): Promise<void> {
    await this.leadsLink.click();
  }

  async openCreateLead(): Promise<void> {
    await this.createLeadLink.first().click();
  }
}
