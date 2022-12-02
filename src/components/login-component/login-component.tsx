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

  displayPassword(e:any) {
    console.log('displayPassword', e.target.id)
    if (e.target.id == 'showNewPassword') {
      this.showPassword = e.target.checked;
    }
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
                <input type="text" class={'mtop10 ' + (false ? 'hasError' : '')}
                  value=''
                  id="user-detail-email"
                  // ref={(el) => this.emailRef = el as HTMLInputElement}
                  // onBlur={(e) => this.validateEmail(e)}
                  aria-required="true"
                  aria-describedby="email_error"

                ></input>
                <div id="email_error">


                {false &&  <div class="mtop10">
                    <span class="error-text">error data</span>
                  </div>}
                  {/* {(this.formErrors.email && this.errorType.isInvalid && this.emailRef.value !== "") && (
                      <div class="mtop10">
                        <img class="error-icon" src="assets/images/i-inline-error.svg" alt="error" />
                        <span class="error-text">{this.content.error['email_invalid_inline']}</span>
                      </div>
                    )} */}
                </div>
              </div>
              {/* PASSWORD SECTION */}
              <div class="mtop5">
                <label htmlFor="user-detail-newpwd">Password</label>
                <input type={this.showPassword ? this.passwordType = "text" : this.passwordType = "password"}
                  class={false ? 'hasError' : ''}
                  value='' id="user-detail-newpwd"

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
                  {false && (
                    <div class="mtop10 ptop5">
                      <img class="error-icon" src="assets/images/i-inline-error.svg" alt="error" />
                      <span class="error-text">test error message</span>
                    </div>
                  )}

                </div>

              </div>
        
              {/* FORM SUBMIT & CANCEL BUTTONS */}
              <div>
                {/* click replaced with mousedown and keydown to overcome blur event hiding form submit issue */}
                <button type="button"

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
