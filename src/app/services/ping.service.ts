import { PingRequest } from './../models/PingRequest';
import { PingResponse } from './../models/PingResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  constructor(private _httpClient: HttpClient) { }

  get():Observable<PingResponse>{
    return this._httpClient.get<PingResponse>(`${environment.gatewayAddress}/v1/ping`);
  }

  post(request: PingRequest):Observable<PingResponse>{
    return this._httpClient.post<PingResponse>(`${environment.gatewayAddress}/v1/ping`,
    request)
  }

}
