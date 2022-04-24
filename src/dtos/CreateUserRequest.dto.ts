import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { UserAddressRequest } from "./UserAddressRequest.dto";

export class CreateUserRequest {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserAddressRequest)
  readonly address: UserAddressRequest;
}