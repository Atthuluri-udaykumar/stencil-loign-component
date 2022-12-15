import { Component,  h, Prop } from '@stencil/core';

@Component({
  tag: 'error-banner',
  styleUrl: 'error-banner.scss',
  shadow: true,
})
export class ErrorBanner {

  @Prop() errorObject: { header: string, message: string, links?: any, isAccLocked?: boolean };
  // @Prop() pwdErrorObject : { header: string, message: string, isCreatePwdFlow?: boolean};
  bannerRef: HTMLElement;
  componentDidRender() {
    this.bannerRef.focus();
  }

  redirectToUnlockAcc(e:any){
    console.log(e);
    // window.location.href = location.protocol + '//' + window.document.domain + constants.unlockAccountURl;
  }


  render() {
    return (
      <div>
        <div class="error-container">
        <div class="error-banner">
          <img src="assets/images/i-alert-banner.svg" alt="error"/>
            <div class="banner-container" tabIndex={0} ref={(el) => this.bannerRef = el as HTMLElement}>
              {/* Error Header */}
              <h2 class="header-message">{this.errorObject.header}</h2>
              {/* Error Body */}
              {!this.errorObject.isAccLocked && (
                 <p class="message" innerHTML={this.errorObject.message}></p>
              )}
             
              {/* {this.pwdErrorObject.isCreatePwdFlow && (
                <h2 class="header-message">{this.pwdErrorObject.header}</h2> 
             )}
             {this.pwdErrorObject.isCreatePwdFlow && (
              <p class="message" innerHTML={this.pwdErrorObject.message}></p>
             )} */}

            {this.errorObject.isAccLocked && (
               <p class="message">You must   
                <span class="text_spacing">
                  <a href="javascript:void(0)" onClick={(e) => this.redirectToUnlockAcc(e)}>{this.errorObject.message}</a>
                </span>
                   to access CVS Specialty.
               </p>
            )}
             
              {/* Error Links */}
              {this.errorObject && this.errorObject.links && this.errorObject.links.map((link) =>
                <div>
                  <a class="link" onClick={() => link.ref.focus()} href="javascript:void(0)">{ link.message }</a>
              </div>
              )}
              </div>
            </div>          
       </div>

      </div>


    );
  }

}
