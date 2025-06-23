import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1750456269593 implements MigrationInterface {
  name = 'Migrations1750456269593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "agricom"."address" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "street" character varying(255) NOT NULL,
                "city" character varying(255) NOT NULL,
                "postal_code" character varying(50) NOT NULL,
                "country" character varying(100) NOT NULL,
                CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "agricom"."users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "password" character varying(255) NOT NULL,
                "first_name" character varying(100) NOT NULL,
                "last_name" character varying(100) NOT NULL,
                "birthday" character varying(10) NOT NULL,
                "address1_id" uuid NOT NULL,
                "address2_id" uuid,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "REL_8061bc34d98c1f248a42f5ad05" UNIQUE ("address1_id"),
                CONSTRAINT "REL_df0999a4d74475cc47e02906e9" UNIQUE ("address2_id"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "idx_users_email" ON "agricom"."users" ("email")
        `);
    await queryRunner.query(`
            CREATE TABLE "agricom"."company" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "address1_id" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"),
                CONSTRAINT "REL_ca716711b49993278a3735184c" UNIQUE ("address1_id"),
                CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "idx_company_name" ON "agricom"."company" ("name")
        `);
    await queryRunner.query(`
            CREATE TABLE "agricom"."company_users_users" (
                "companyId" uuid NOT NULL,
                "usersId" uuid NOT NULL,
                CONSTRAINT "PK_f5c92ef89a49984143f37b67455" PRIMARY KEY ("companyId", "usersId")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_8ec948dfb19096ed9ac739ada3" ON "agricom"."company_users_users" ("companyId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_e200d0a39f6ea44b345f6e1ff5" ON "agricom"."company_users_users" ("usersId")
        `);
    await queryRunner.query(`
            ALTER TABLE "agricom"."users"
            ADD CONSTRAINT "FK_8061bc34d98c1f248a42f5ad052" FOREIGN KEY ("address1_id") REFERENCES "agricom"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "agricom"."users"
            ADD CONSTRAINT "FK_df0999a4d74475cc47e02906e9f" FOREIGN KEY ("address2_id") REFERENCES "agricom"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "agricom"."company"
            ADD CONSTRAINT "FK_ca716711b49993278a3735184c9" FOREIGN KEY ("address1_id") REFERENCES "agricom"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "agricom"."company_users_users"
            ADD CONSTRAINT "FK_8ec948dfb19096ed9ac739ada36" FOREIGN KEY ("companyId") REFERENCES "agricom"."company"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "agricom"."company_users_users"
            ADD CONSTRAINT "FK_e200d0a39f6ea44b345f6e1ff54" FOREIGN KEY ("usersId") REFERENCES "agricom"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "agricom"."company_users_users" DROP CONSTRAINT "FK_e200d0a39f6ea44b345f6e1ff54"
        `);
    await queryRunner.query(`
            ALTER TABLE "agricom"."company_users_users" DROP CONSTRAINT "FK_8ec948dfb19096ed9ac739ada36"
        `);
    await queryRunner.query(`
            ALTER TABLE "agricom"."company" DROP CONSTRAINT "FK_ca716711b49993278a3735184c9"
        `);
    await queryRunner.query(`
            ALTER TABLE "agricom"."users" DROP CONSTRAINT "FK_df0999a4d74475cc47e02906e9f"
        `);
    await queryRunner.query(`
            ALTER TABLE "agricom"."users" DROP CONSTRAINT "FK_8061bc34d98c1f248a42f5ad052"
        `);
    await queryRunner.query(`
            DROP INDEX "agricom"."IDX_e200d0a39f6ea44b345f6e1ff5"
        `);
    await queryRunner.query(`
            DROP INDEX "agricom"."IDX_8ec948dfb19096ed9ac739ada3"
        `);
    await queryRunner.query(`
            DROP TABLE "agricom"."company_users_users"
        `);
    await queryRunner.query(`
            DROP INDEX "agricom"."idx_company_name"
        `);
    await queryRunner.query(`
            DROP TABLE "agricom"."company"
        `);
    await queryRunner.query(`
            DROP INDEX "agricom"."idx_users_email"
        `);
    await queryRunner.query(`
            DROP TABLE "agricom"."users"
        `);
    await queryRunner.query(`
            DROP TABLE "agricom"."address"
        `);
  }
}
