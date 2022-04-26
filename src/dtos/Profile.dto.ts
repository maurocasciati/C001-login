import { ProfileEntity } from "./ProfileEntity.dto";

export class ProfileDto {
  id: number;
  name: string;
  address: {
    street: string,
    city: string,
    country: string,
  }

  constructor(profileEntity: ProfileEntity) {
    this.id = profileEntity.id;
    this.name = profileEntity.name;
    this.address = {
      street: profileEntity.street,
      city: profileEntity.city,
      country: profileEntity.country,
    }
  }
}