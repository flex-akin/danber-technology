
import { Request } from 'express';
import { role } from 'interface/optionsInterface';

declare global {
    namespace Express {
        interface Request {
            user?: TUser
        }
    }
}


type TUser = {
    id: string,
    email: string,
    role: role
}