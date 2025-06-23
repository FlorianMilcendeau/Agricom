import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { AddressEntity } from './address.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_users_email')
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  birthday: string;

  address1_id: string;

  @OneToOne(() => AddressEntity, {
    cascade: ['insert', 'update', 'remove'],
    nullable: false,
  })
  @JoinColumn({ name: 'address1_id' })
  address1?: AddressEntity;

  address2_id: string | null;

  @OneToOne(() => AddressEntity, { cascade: ['insert', 'update', 'remove'] })
  @JoinColumn({ name: 'address2_id' })
  address2?: AddressEntity;
}
