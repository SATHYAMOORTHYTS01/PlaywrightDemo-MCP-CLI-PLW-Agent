export type LeadData = {
  companyName: string;
  firstName: string;
  lastName: string;
};

export function createLeadData(): LeadData {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    companyName: `Playwright QA ${suffix}`,
    firstName: `Lead${suffix.slice(-6)}`,
    lastName: 'Automation',
  };
}
