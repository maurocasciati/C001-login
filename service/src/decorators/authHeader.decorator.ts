import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
  
export const AuthHeader = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    
    return request.user?.[data];
});