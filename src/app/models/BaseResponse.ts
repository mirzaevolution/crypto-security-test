export interface BaseResponse{
  IsSuccess: boolean;
  IsEncrypted: boolean;
  Errors: Array<string>;
  Result?: any;
}
