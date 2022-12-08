import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;


  singInDetailSubmit(data: any) {
    alert(JSON.stringify(data))
    console.log(data);

  }


  render() {
    return <div>
      <login-component heading="Sing In" onSingInDetailSubmit={this.singInDetailSubmit}></login-component>
    </div>;
  }
}
