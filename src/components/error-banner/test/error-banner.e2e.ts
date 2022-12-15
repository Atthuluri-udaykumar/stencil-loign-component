import { newE2EPage } from '@stencil/core/testing';

describe('error-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<error-banner></error-banner>');

    const element = await page.find('error-banner');
    expect(element).toHaveClass('hydrated');
  });
});
