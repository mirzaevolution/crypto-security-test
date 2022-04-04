import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-encrypt-decrypt',
  templateUrl: './encrypt-decrypt.component.html',
  styleUrls: ['./encrypt-decrypt.component.css']
})
export class EncryptDecryptComponent{

  cipherText = '';
  decryptResult = '';
  plainText = '';
  encryptResult = '';

  encrypt(){
    this.plainText = this.plainText.trim();
    if(this.plainText!=''){
      try{
        let ivWordArray = this.getInitVectorWordArray();
        let saltWordArray = this.getSaltWordArray();
        let passwordWordArray = this.getPasswordWordArray(environment.securityPipeline.password, saltWordArray);
        let encryptedCipherParams =  CryptoJS.AES.encrypt(this.plainText, passwordWordArray, {
          iv: ivWordArray
        });
        this.encryptResult = encryptedCipherParams.toString();
      } catch(err){
        alert('Encryption process failed. Please check the console!');
        console.error(err);
      }
    } else {
      alert('Please input plain text and password!');
    }

  }

  decrypt(){
    this.cipherText = this.cipherText.trim();
    if(this.cipherText!=''){
      try{
        let ivWordArray = this.getInitVectorWordArray();
        let saltWordArray = this.getSaltWordArray();
        let passwordWordArray = this.getPasswordWordArray(environment.securityPipeline.password, saltWordArray);
        let decryptedCipherParams = CryptoJS.AES.decrypt(this.cipherText, passwordWordArray,{
          iv: ivWordArray
        });
        this.decryptResult = CryptoJS.enc.Utf8.stringify(decryptedCipherParams);
        if(this.decryptResult == ''){
          alert('Invalid decryption key');
        }
      } catch(err){
        console.log('Decryption process failed. Please check the console!');
        console.error(err);
      }
    } else {
      alert('Please input cipher text and password!');
    }

  }

  getPasswordWordArray(password: string, salt: CryptoJS.lib.WordArray): CryptoJS.lib.WordArray{
    return CryptoJS.PBKDF2(password, salt, {
      keySize: 8,
      iterations: 10_000
    });
  }

  getInitVectorWordArray(): CryptoJS.lib.WordArray{
    return CryptoJS.enc.Base64.parse(environment.securityPipeline.iv);
  }

  getSaltWordArray() : CryptoJS.lib.WordArray{
    return CryptoJS.enc.Base64.parse(environment.securityPipeline.salt);
  }
}
