import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cipherText = '';
  cipherPassword = '';
  decryptResult = '';
  plainText = '';
  plainPassword = '';
  encryptResult = '';

  iv = 'En9BbHwGmuch2EDqweF/Kw==';
  salt = '0uFbhTBMpkhD3Rx6ND/GghWZXoTufH9UnZHhnSJP3j8=';


  encrypt(){
    this.plainText = this.plainText.trim();
    this.plainPassword = this.plainPassword.trim();
    if(this.plainText!='' && this.plainPassword != ''){
      try{
        let ivWordArray = this.getInitVectorWordArray();
        let saltWordArray = this.getSaltWordArray();
        let passwordWordArray = this.getPasswordWordArray(this.plainPassword, saltWordArray);
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
    this.cipherPassword = this.cipherPassword.trim();
    if(this.cipherText!='' && this.cipherPassword!=''){
      try{
        let ivWordArray = this.getInitVectorWordArray();
        let saltWordArray = this.getSaltWordArray();
        let passwordWordArray = this.getPasswordWordArray(this.cipherPassword, saltWordArray);
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
    return CryptoJS.enc.Base64.parse(this.iv);
  }

  getSaltWordArray() : CryptoJS.lib.WordArray{
    return CryptoJS.enc.Base64.parse(this.salt);
  }
}
