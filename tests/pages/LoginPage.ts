import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly heading = this.page.getByRole('heading', { name: 'Leaftaps Login' });
  private readonly username = this.page.getByRole('textbox', { name: 'Username' });
  private readonly password = this.page.getByRole('textbox', { name: 'Password' });
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('http://leaftaps.com/opentaps/control/main');
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    await expect(this.page.getByRole('heading', { name: /Welcome/ })).toBeVisible();
  }
}
