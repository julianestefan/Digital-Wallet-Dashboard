import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { JwtAuthGuard } from './jwt.guard';
import { PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class GlobalGuard extends JwtAuthGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    // call AuthGuard in order to ensure user is injected in request
    const baseGuardResult = await super.canActivate(context);

    return !!baseGuardResult;
  }
}
