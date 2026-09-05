import {compare, hash} from "bcrypt-ts"


export class AuthService {
    static async hashPassword(originalPassword:string, salts:number = 10): Promise<string>{
        return await hash(originalPassword, salts)
    }

    static async comparePassword(inputPassword:string, savedPassword:string): Promise<boolean>{
        return await compare(inputPassword, savedPassword)
    }
    
}