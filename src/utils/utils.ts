export const endpoint = 'https://api.realworld.io/api';

export interface IStandardReq {
  path: string;
  method: 'GET' | 'PUT' | 'POST' | 'DELETE';
  body?: string;
  token?: string;
  reqHeaders?:any;
}

export const standardReq = async ({
  path,
  method,
  body,
  reqHeaders={},
  token,
}: IStandardReq) => {
  const reqPath = `${endpoint}/${path}`;
  let headers: { [key: string]: string } = {
    'content-type': 'application/json',
  };
  if (token) {
    headers = { ...headers,...reqHeaders, authorization: `Token ${token}` };
  }
  try {
    const req = await fetch(reqPath, {
      credentials: 'omit',
      headers,
      method,
      body,
      mode: 'cors',
    });
    const data = await req.json();
    return data;
  } catch (errors) {
    console.error(errors);
    return { errors };
  }
};

export function clientFingerprint() { 

  //OS
  let OSName = "Unknown";
  if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
  else if (window.navigator.userAgent.indexOf("Windows NT 6.3") != -1) OSName="Windows 8.1";
  else if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
  else if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
  else if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
  else if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
  else if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
  else if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
  else if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
  else if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";

  // browser
  let nAgt :any = navigator.userAgent;
  let browser:any = navigator.appName;
  let version:any= '' + parseFloat(navigator.appVersion);
  let nameOffset:any, verOffset:any;

  // Opera
  if ((verOffset = nAgt.indexOf('Opera')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
          version = nAgt.substring(verOffset + 8);
      }
  }
  // Opera Next
  if ((verOffset = nAgt.indexOf('OPR')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 4);
  }
  // Legacy Edge
  else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
      browser = 'Microsoft Legacy Edge';
      version = nAgt.substring(verOffset + 5);
  } 
  // Edge (Chromium)
  else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
      browser = 'Microsoft Edge';
      version = nAgt.substring(verOffset + 4);
  }
  // MSIE
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(verOffset + 5);
  }
  // Chrome
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
      browser = 'Chrome';
      version = nAgt.substring(verOffset + 7);
  }
  // Safari
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
      browser = 'Safari';
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
          version = nAgt.substring(verOffset + 8);
      }
  }
  // Firefox
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
      browser = 'Firefox';
      version = nAgt.substring(verOffset + 8);
  }
  // MSIE 11+
  else if (nAgt.indexOf('Trident/') != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(nAgt.indexOf('rv:') + 3);
  }
  // Other browsers
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() == browser.toUpperCase()) {
          browser = navigator.appName;
      }
  }
  let majorVersion = parseInt('' + version, 10);
  if (isNaN(majorVersion)) {
      version = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
  }
  const clientCharacteristics = { 
    "browserName": browser,
    "browserVersion": majorVersion,
    "operatingSystem": OSName
  }
  const mfaBypassToken = localStorage.getItem('mfaBypassToken') || '';
  const clientCharJson = {"clientCharacteristics": clientCharacteristics, "mfaBypassToken": mfaBypassToken};
  const encoded = btoa(JSON.stringify(clientCharJson));
return encoded;
} 