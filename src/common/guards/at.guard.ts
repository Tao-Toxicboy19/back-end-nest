import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublice = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass()
        ]);
        if (isPublice) return true;

        return super.canActivate(context)
    }
}