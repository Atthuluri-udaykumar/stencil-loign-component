import { newSpecPage } from '@stencil/core/testing';
import { ErrorBanner } from '../error-banner';

describe('error-banner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ErrorBanner],
      html: `<error-banner></error-banner>`,
    });
    expect(page.root).toEqualHtml(`
      <error-banner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </error-banner>
    `);
  });
});
