import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { AddressEntity } from './address.entity';

@Entity('company')
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_company_name')
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  address1_id: string;

  @OneToOne(() => AddressEntity, {
    cascade: ['insert', 'update', 'remove'],
    nullable: false,
  })
  @JoinColumn({ name: 'address1_id' })
  address1?: AddressEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];
}
