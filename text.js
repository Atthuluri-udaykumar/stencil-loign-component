import fetch from "cross-fetch";
import { ENV_CONFIG } from "../constant/env-config";


class AuthServiceController {


  public envs: string[] = [
    'sit1', 'sit2', 'sit3', 'local'
  ];

  public getHostName(): string {
    return window.location.hostname;
  }

  public getEnv(): string {
    let env: string = 'prod';
    const host: string = this.getHostName();

    for (const i of this.envs) {
      if (host && host.includes(i)) {
        env = i;
        break;
      }
    }
    return env
  }

  public getEnvConfig(): any {
    const env: string = this.getEnv() || 'prod';

    return ENV_CONFIG[env];
  }

  private config =this.getEnvConfig();
  
  private baseUrl='https://sit1-api.cvshealth.com/'


  private getHeaders(type:string,idToken:any):any{
    return ({
      'Content-Type': type,
      'Accept': '*/*',
      'Authorization':`Bearer ${idToken}`,
      'x-api-key': '1M3aGZyeBYEJFFK84TCmFX230Qtp3rZG',
      'Cookie': "1M3aGZyeBYEJFFK84TCmFX230Qtp3rZG",

    });
 }  
 private readonly getLogOutReqInit = (idToken:any): RequestInit => {
    return {
      method: "DELETE",
      headers: this.getHeaders('application/json',idToken)
    }
  }

  private readonly getRefreshReqInit = (idToken:any): RequestInit => {
    return {
      method: "GET",
      headers: this.getHeaders('application/x-www-form-urlencoded',idToken),
      // body: `grant_type=refresh_token&client_id=${this.config.keyCloakConfig.clientId}`
    }
  }
  
  public logOut(idToken:any): Promise<any> {
    const logoutUrl: string = `${this.baseUrl}specialty/userservice/v1/logout`;
      return fetch(logoutUrl, this.getLogOutReqInit(idToken));
  }

  public refreshToken(idToken:any): Promise<any> {
    const tokenUrl: string = `${this.baseUrl}specialty/userservice/v1/refreshtoken`;
    return fetch(tokenUrl, this.getRefreshReqInit(idToken));
  }

  public set envConfig(config: any) {
    this.config = config;
  }
  public get envConfig(): any {
    return this.config;
  }
}

export const AuthService = new AuthServiceController();
