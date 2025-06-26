import { Mapper } from 'src/common/mapper';
import { AddressEntity } from 'src/entities/address.entity';
import { Address } from '../dto/address.dto';
import { StaticImplements } from 'src/common/decorator';

@StaticImplements<Mapper<AddressEntity, Address>>()
export class AddressMapper {
  static toDomain(entity: AddressEntity): Address {
    return {
      id: entity.id,
      street: entity.street,
      city: entity.city,
      postalCode: entity.postal_code,
      country: entity.country,
      createdAt: entity.created_at,
    };
  }

  static toEntity(domain: Address): AddressEntity {
    return {
      id: domain.id,
      street: domain.street,
      city: domain.city,
      postal_code: domain.postalCode,
      country: domain.country,
      created_at: domain.createdAt,
      updated_at: null,
      deleted_at: null,
    };
  }
}
