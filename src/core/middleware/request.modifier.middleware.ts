import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestModifierMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("Req user: ", req.user);
    next();
  }
}
