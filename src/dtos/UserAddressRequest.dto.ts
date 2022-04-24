import { IsNotEmpty } from "class-validator";

export class UserAddressRequest {
  @IsNotEmpty()
  readonly street: string;

  @IsNotEmpty()
  readonly city: string;

  @IsNotEmpty()
  readonly country: string;
}