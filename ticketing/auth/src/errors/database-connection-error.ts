
import {CustomError} from "./custom-error" 


export class DatabaseConnectionError extends CustomError{
    reason ='Error connectiing to database connection'
    statusCode =500
    constructor(){
        super("error connecting to db")
        Object.setPrototypeOf(this,DatabaseConnectionError.prototype)
    }
    serializeError(){
        return [{
            message:this.reason
        }]
 
     }
}