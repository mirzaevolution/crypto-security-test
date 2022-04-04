import { CryptographyService } from './../services/cryptography.service';
import { BaseResponse } from './../models/BaseResponse';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncryptedRequest } from '../models/EncryptedRequest';
@Injectable()
export class SecurityPipelineInterceptor implements HttpInterceptor {

  constructor(private _cryptographyService: CryptographyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(['GET','DELETE'].includes(request.method)){

      request = request.clone({
        setHeaders: { 'X-ENCRYPTION-PIPELINE':'out' }
      });

    } else if(['POST','PUT'].includes(request.method)){

      let encryptedPayload: EncryptedRequest = {
        Payload: this._cryptographyService.encrypt(request.body)
      };

      request = request.clone<EncryptedRequest>({
        body: encryptedPayload,
        setHeaders: { 'X-ENCRYPTION-PIPELINE':'in-out' }
      });

    }
    return next.handle(request).pipe(map((event:HttpEvent<any>) => {
      if(event instanceof HttpResponse){

        let baseResponse:BaseResponse = null;

        try{
          baseResponse = event.body as BaseResponse;
        }catch(err){
          console.error(err);
        }

        if(baseResponse && baseResponse!=null && baseResponse.IsEncrypted==true){

          baseResponse.Result = this._cryptographyService.decrypt(baseResponse.Result);

          return event.clone<BaseResponse>({
            body: baseResponse
          });
        }
      }
      return event;
    }));
  }
}
