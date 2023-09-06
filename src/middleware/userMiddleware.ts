import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class UserMiddleware implements NestMiddleware {
    use(req: any, res: any, next: NextFunction) {
        const user = req.user;
        req['currentUser'] = user ;
        next();
    }
}