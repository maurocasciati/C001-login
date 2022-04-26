import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserBody = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().body;
  },
);
