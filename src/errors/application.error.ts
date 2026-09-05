import {StatusCodes} from "http-status-codes"

export class ApplicationError extends Error {
    status_code:number

    constructor(message:string, status_code:number = StatusCodes.BAD_REQUEST ) {
        super(message);
        this.status_code = status_code
    }
    
}

