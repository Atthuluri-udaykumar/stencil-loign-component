import { Component, EventEmitter, Event, h, Prop, State } from '@stencil/core';
import { clientFingerprint, standardReq } from '../../utils/utils';
import * as Jose from "../../assets/vendor/joseEncryption.js"
@Component({
  tag: 'login-component',
  styleUrl: 'login-component.scss',
  shadow: true,
})
export class LoginComponent {
  @State() showPassword = false;
  @Prop() heading: string;
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
  @State() errorDetails: { header: any, message: any, links: any, isAccLocked?: boolean } = {
    header: '',
    message: '',
    links: '',
    isAccLocked: false
  }
  @State() showBanner: Boolean = false;
  @Event() singInDetailSubmit: EventEmitter<any>;

  @State() emailRef: any;
  @State() passwordRef: any;

  displayPassword(e: any) {
    if (e.target.id == 'showNewPassword') {
      this.showPassword = e.target.checked;
    }
  }

  onEmailBlur() {
    const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.emailRef.value) {
      this.errorObj = {
        ...this.errorObj,
        email: 'Please enter an email address'
      }

    } else if (!filter.test(this.emailRef.value)) {
      this.errorObj = {
        ...this.errorObj,
        email: 'Please enter a valid email address'
      }

    } else {
      this.errorObj = {
        ...this.errorObj,
        email: ''
      }
    }
  }


  onPasswordBlur() {
    if (!this.passwordRef.value) {
      this.errorObj = {
        ...this.errorObj,
        password: 'Please enter a password'
      }
    } else {
      this.errorObj = {
        ...this.errorObj,
        password: ''
      }
    }
  }

  onInputChange(e: any) {
    const { name, value } = e.target;
    this.formData = {
      ...this.formData,
      [name]: value
    }
  }
  onFormSubmit() {
    this.onEmailBlur();
    this.onPasswordBlur();
    let filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.formData.email && !this.formData.password) {
      this.errorDetails.header = 'Please correct the errors';
      this.errorDetails.message = 'Enter account holders valid email address and password';
      this.showBanner = true;
      this.dummyState = !this.dummyState;
    } else if (!this.formData.email) {
      this.errorDetails.header = 'Email address is missing';
      this.errorDetails.message = 'Enter account holders email address';
      this.showBanner = true;
      this.dummyState = !this.dummyState;
    } else if (this.formData.email != "" && !filter.test(this.formData.email)) {
      this.errorDetails.header = 'Email address is invalid';
      this.errorDetails.message = "Enter account holder's valid email address";
      this.showBanner = true;
      this.dummyState = !this.dummyState;
    } else {
      this.showBanner = false
      this.dummyState = !this.dummyState;
    }
    console.log(this.formData);
    this.singInDetailSubmit.emit(this.formData)

  }
  /**
   * @type: const
   * @description:  base64 encoded URL RSA public Key
   */
  base64EncodedUrlRSAPubKey: {
    qa: {
      "kty": "RSA",
      "n": "t7Xn2memQmkRG8QFX1w0dTbFqDrt2mA2QbX1-VLDKmVBRRhf_38JhzwjwXMLpHb7xQGag3GU2AtoXhHBZpIk7adeUEqhyi4-LXIwBprEaT8Yx4bokUukiaD64Rgmw12NpZ_O8BBpEnn_Y80EAOswyhgNxT4LzUe0U6Wowp2nsNPN6tLZ5hWEv5o0mkdRbuXF5kp33uSCNgq67pWFFGWGHGBm0RyL9I4LDVWcxiPQ7cQp-qtC9UEmob2zwK2kzITKYMcxTAQrMs7nLKOP5Ym8RP2Vw3MByzWK6KGb3ZkhbyCsm-ElblDuRdZeQu-zmgPV2j4qxAZ8gET88icWX9IKOw",
      "e": "AQAB"
    }
    // ,
    // prod: {
    //   'kty': 'RSA',
    //   'n': 't7Xn2memQmkRG8QFX1w0dTbFqDrt2mA2QbX1-VLDKmVBRRhf_38JhzwjwXMLpHb7xQGag3GU2AtoXhHBZpIk7adeUEqhyi4-LXIwBprEaT8Yx4bokUukiaD64Rgmw12NpZ_O8BBpEnn_Y80EAOswyhgNxT4LzUe0U6Wowp2nsNPN6tLZ5hWEv5o0mkdRbuXF5kp33uSCNgq67pWFFGWGHGBm0RyL9I4LDVWcxiPQ7cQp-qtC9UEmob2zwK2kzITKYMcxTAQrMs7nLKOP5Ym8RP2Vw3MByzWK6KGb3ZkhbyCsm-ElblDuRdZeQu-zmgPV2j4qxAZ8gET88icWX9IKOw',
    //   'e': 'AQAB'
    // }
  }

  encryptPassword(password: any, ephemeralKey: any) {
    const cryptoGrapher = new Jose.WebCryptographer();
    const ephemeralCryptoKey = crypto?.subtle?.importKey('raw', ephemeralKey, 'AES-KW', true, ['wrapKey', 'unwrapKey']);

    cryptoGrapher.setKeyEncryptionAlgorithm('A256KW');
    cryptoGrapher.setContentEncryptionAlgorithm('A256CBC-HS512');

    const encrypter = new Jose.JoseJWE.Encrypter(cryptoGrapher, ephemeralCryptoKey);
    return encrypter.encrypt(password);
  }

  encryptEphemeralKey(key: any) {
    const env = /localhost|dev|pt|qa|sit|uat\d*\.caremark.com/.test(window.location.hostname.toLowerCase()) ? "qa" : "prod";
    //const env = "qa";
    const publicKeyEnv = env === 'prod' ? 'prod' : 'qa';
    const cryptoGrapher = new Jose.WebCryptographer();
    let pk = this.base64EncodedUrlRSAPubKey?.[publicKeyEnv];

    pk = Jose?.Utils?.importRsaPublicKey(pk, 'RSA-OAEP-256');
    cryptoGrapher.setKeyEncryptionAlgorithm('RSA-OAEP-256');
    cryptoGrapher.setContentEncryptionAlgorithm('A256CBC-HS512');

    const encrypter = new Jose.JoseJWE.Encrypter(cryptoGrapher, pk);
    return encrypter.encrypt(key);
  }

  async onRememberMe(event: any) {
    const ephemeralKey = new Uint8Array(32);
    const sharedSecret = crypto?.getRandomValues(ephemeralKey);
    const base64StringEphKey: any = btoa(String.fromCharCode.apply(null, new Uint8Array(sharedSecret)));
    const cryptoGrapher = new Jose.WebCryptographer();
    this.encryptEphemeralKey(base64StringEphKey)
    console.log(event.target.checked);
    console.log(clientFingerprint(), 'cf');
    const userInfo = await standardReq({
      path: 'users/login',
      body: JSON.stringify({
        password: this.encryptPassword(this.formData.password, ephemeralKey)
      }),
      method: 'POST',
      reqHeaders:{}
    });
    console.log(userInfo);
  }

  render() {

    return (
      <div>

        <div role="main" class="user-detail-container">

          {this.showBanner && <error-banner errorObject={this.errorDetails}></error-banner>}

          <div class="enterprise-theme-cvs">
            <h1>{this.heading}</h1>
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
                  ref={(el) => this.emailRef = el as HTMLInputElement}
                  onBlur={() => this.onEmailBlur()}
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
                  ref={(el) => this.passwordRef = el as HTMLInputElement}
                  onBlur={() => this.onPasswordBlur()}
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
              <div class="checkbox-container"  >
                <input role="checkbox"
                  type="checkbox" tabindex="0"
                  id="showNewPassword" name='reset-password' class="checkbox" onChange={async (e) => await this.onRememberMe(e)} />
                <label class="checkboxlabel" htmlFor="showNewPassword">rememberME</label>
              </div>

              {/* FORM SUBMIT & CANCEL BUTTONS */}
              <div>
                {/* click replaced with mousedown and keydown to overcome blur event hiding form submit issue */}
                <button type="button"
                  onClick={() => this.onFormSubmit()}
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
