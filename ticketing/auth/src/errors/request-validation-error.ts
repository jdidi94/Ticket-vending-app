import {ValidationError} from 'express-validator'
import {CustomError} from "./custom-error" 
// interface customError{
//     statusCode: number
//     serializeError():{
//     message: string;
//     field?: string
//     }[]
// }
export class RequestValidationError extends CustomError  {
    statusCode = 400;
    constructor(public errors: ValidationError[]){
  super("invalid request handling")
  Object.setPrototypeOf(this,RequestValidationError.prototype)
    }
    serializeError(){
       return this.errors.map(error=>{
        return {message: error.msg,field:error.param}
      })

    }
}