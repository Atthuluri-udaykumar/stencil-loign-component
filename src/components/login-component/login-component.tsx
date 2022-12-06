import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'login-component',
  styleUrl: 'login-component.scss',
  shadow: true,
})
export class LoginComponent {
  @State() showPassword = false;
  @Prop() name: string;
  passwordType: string;

  @State() emailValue: string;
  @State() passwordValue: string;
  @State() dummyState: boolean = false;
  @State() errorObj: any = {
    email: '',
    password: ''
  }
  @State() formData: any = {
    email: '',
    password: ''
  }
  displayPassword(e: any) {
    if (e.target.id == 'showNewPassword') {
      this.showPassword = e.target.checked;
    }
  }

  onInputBlur(e: any) {
    const { name, value } = e.target;
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === 'email') {
      if (!value) {
        this.errorObj.email = 'Please enter an email address'
      } else if (!filter.test(value)) {
        this.errorObj.email = 'Please enter a valid email address'
      } else {
        this.errorObj.email = ''
      }
    }
    if (name === 'password') {
      if (!value) {
        this.errorObj.password = 'Please enter a password'
      } else {
        this.errorObj.password = ''
      }
    }
    this.dummyState = !this.dummyState;
  }

  onInputChange(e: any) {
    const { name, value } = e.target;
    this.formData = {
      ...this.formData,
      [name]: value
    }
  }
  onFormSubmit() {
    console.log(this.formData);
  }
  render() {

    return (
      <div>

        <div role="main" class="user-detail-container">

          <div class="enterprise-theme-cvs">
            <h1>Sign In</h1>
            <form novalidate>
              {/* EMAIL SECTION */}
              <div class="mtop10">
                <label htmlFor="user-detail-email">Email Address</label>
                <div id="email_desc">Account Holder Only</div>
                <input
                  type="text"
                  class={'mtop10 ' + (!!this.errorObj?.email ? 'hasError' : '')}
                  value={this.formData.email}
                  id="user-detail-email"
                  name='email'
                  onChange={(e) => this.onInputChange(e)}
                  // ref={(el) => this.emailRef = el as HTMLInputElement}
                  onBlur={(e) => this.onInputBlur(e)}
                  aria-required="true"
                  aria-describedby="email_error"

                ></input>
                <div id="email_error">
                  {!!this.errorObj?.email && <div class="mtop10">
                    {/* <img class="error-icon" src="assets/images/i-inline-error.svg" alt="error" /> */}
                    <span class="error-text">{this.errorObj?.email}</span>
                  </div>}

                </div>
              </div>
              {/* PASSWORD SECTION */}
              <div class="mtop5">
                <label htmlFor="user-detail-newpwd">Password</label>
                <input type={this.showPassword ? this.passwordType = "text" : this.passwordType = "password"}
                  class={!!this.errorObj?.password ? 'hasError' : ''}
                  id="user-detail-newpwd"
                  name='password'
                  value={this.formData.password}
                  onBlur={(e) => this.onInputBlur(e)}
                  onChange={(e) => this.onInputChange(e)}
                  onPaste={(e) => { e.preventDefault(); return false; }}
                  onCopy={(e) => { e.preventDefault(); return false; }}
                  aria-required="true"
                  aria-describedby="newpwd_error"
                />
                <div class="checkbox-container"  >
                  <input role="checkbox"
                    type="checkbox" tabindex="0" aria-checked={this.passwordType == "password" ? "false" : "true"}
                    id="showNewPassword" name='reset-password' class="checkbox" onChange={(e) => this.displayPassword(e)} />
                  <label class="checkboxlabel" htmlFor="showNewPassword">Show password</label>
                </div>
                <div id="newpwd_error">
                  {!!this.errorObj?.password && (
                    <div class="mtop10 ptop5">
                      {/* <img class="error-icon" src="assets/images/i-inline-error.svg" alt="error" /> */}
                      <span class="error-text">{this.errorObj?.password}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* FORM SUBMIT & CANCEL BUTTONS */}
              <div>
                {/* click replaced with mousedown and keydown to overcome blur event hiding form submit issue */}
                <button type="button"
                  onClick={ ()=>this.onFormSubmit()}
                  class="mtop20 primary-btn">Continue</button>
              </div>
              <div>
                <button type="button" class="mtop24 secondary-btn">Cancel</button>
              </div>


            </form>


          </div>
        </div>

      </div>
    );
  }

}
