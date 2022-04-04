import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CryptographyService {

  constructor() { }

  decrypt(cipherText: string): any{
    let ivWordArray: CryptoJS.lib.WordArray = this.getInitVectorWordArray();
    let saltWordArray: CryptoJS.lib.WordArray = this.getSaltWordArray();
    let passwordWordArray: CryptoJS.lib.WordArray = this.getPasswordWordArray(environment.securityPipeline.password, saltWordArray);
    let decryptedCipherParams: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(cipherText, passwordWordArray,{
      iv: ivWordArray
    });
    let plainText: string = CryptoJS.enc.Utf8.stringify(decryptedCipherParams);
    return JSON.parse(plainText);
  }

  encrypt(plainObject: object): string{
    let plainObjectJson: string = JSON.stringify(plainObject);
    let ivWordArray: CryptoJS.lib.WordArray = this.getInitVectorWordArray();
    let saltWordArray: CryptoJS.lib.WordArray = this.getSaltWordArray();
    let passwordWordArray: CryptoJS.lib.WordArray = this.getPasswordWordArray(environment.securityPipeline.password, saltWordArray);
    let encryptedCipherParams: CryptoJS.lib.CipherParams =  CryptoJS.AES.encrypt(plainObjectJson, passwordWordArray, {
      iv: ivWordArray
    });
    return encryptedCipherParams.toString();

  }

  private getPasswordWordArray(password: string, salt: CryptoJS.lib.WordArray): CryptoJS.lib.WordArray{
    return CryptoJS.PBKDF2(password, salt, {
      keySize: 8,
      iterations: 10_000
    });
  }

  private getInitVectorWordArray(): CryptoJS.lib.WordArray{
    return CryptoJS.enc.Base64.parse(environment.securityPipeline.iv);
  }

  private getSaltWordArray() : CryptoJS.lib.WordArray{
    return CryptoJS.enc.Base64.parse(environment.securityPipeline.salt);
  }

}
