export interface Mapper<Entity, Domain> {
  new (): unknown;

  toDomain(entity: Entity): Domain;
  toEntity(domain: Domain): Entity;
}
