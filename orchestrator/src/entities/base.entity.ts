import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  readonly created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at: Date | null;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date | null;
}
