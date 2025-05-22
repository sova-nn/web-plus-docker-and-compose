import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../dto/jwt.payload';

export const User = createParamDecorator(
  (key: keyof JwtPayload, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const user = req.user;

    if (!user) {
      return null;
    }

    return key ? user[key] : user;
  },
);
