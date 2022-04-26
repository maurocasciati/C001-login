import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const OwnBody = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().body;
  },
);
