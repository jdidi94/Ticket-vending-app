import {CustomError} from "./custom-error"
export class  BadrequestError extends CustomError {
    statusCode=400
    constructor(public message:string){
        super(message)
        Object.setPrototypeOf(this, BadrequestError.prototype)
    }
    serializeError(){
        return [{message:this.message}]
    }
}