import { newSpecPage } from '@stencil/core/testing';
import { LoginComponent } from '../login-component';

describe('login-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LoginComponent],
      html: `<login-component></login-component>`,
    });
    expect(page.root).toEqualHtml(`
      <login-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </login-component>
    `);
  });
});
