import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { isEmpty } from '../utils/object.utils';

@Injectable()
export class BodyValidator implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (isEmpty(value)) {
      throw new HttpException('Payload is empty', HttpStatus.BAD_REQUEST)
    }
    
    const validationErrors = await validate(plainToClass(metadata.metatype, value));

    if (validationErrors.length > 0) {
      throw new HttpException(`${validationErrors.slice().join(', ')}`, HttpStatus.BAD_REQUEST)
    }
    
    return value;
  }
}