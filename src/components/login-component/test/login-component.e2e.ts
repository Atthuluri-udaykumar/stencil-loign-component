import { newE2EPage } from '@stencil/core/testing';

describe('login-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<login-component></login-component>');

    const element = await page.find('login-component');
    expect(element).toHaveClass('hydrated');
  });
});
