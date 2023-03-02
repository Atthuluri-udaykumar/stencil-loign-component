import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EnvConfigService } from '../shared/services/env-config/env-config.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url: string = this.envConfig.getEnvConfig().baseUrl;
  private _authorization = this.envConfig.getEnvConfig().authorization;
  private _xApiKey = this.envConfig.getEnvConfig().xapikey;

  httpOptions: any = {
    headers: new HttpHeaders({
      'x-api-key': this._xApiKey,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this._authorization

    })
  };

  constructor(
    private http: HttpClient, public envConfig: EnvConfigService
    ) {
  }
  onLoginAuthentication(data: any): Observable<any> {
    if(this.envConfig.getEnvConfig().env == "local"){
      return this.http.get('./assets/api/loginAuthentication.json');
    }
   // return this.http.post(`${this._url}/specialty/loginservice/v1/authentication`, data, this.httpOptions); 
    return this.http.post(`${this._url}/apims/specialty/loginservice/v1/authentication`, data, this.httpOptions);
  }



  getPatientProfileService(payload: object): Observable<any> {  
    if(this.envConfig.getEnvConfig().env == "local"){
      return this.http.get('./assets/api/patientProfile.json');
    }  
   // return this.http.post(`${this._url}/specialty/loginservice/details/v1/patientprofile`, payload, this.httpOptions);
    return this.http.post(`${this._url}/apims/specialty/loginservice/details/v1/patientprofile`, payload, this.httpOptions);
  }

  
}
