import { MigrationInterface, QueryRunner } from "typeorm";

export class JobTable1731001692995 implements MigrationInterface {
    name = 'JobTable1731001692995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "job" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "lastRun" TIMESTAMP, "nextRun" TIMESTAMP NOT NULL, "interval" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "job"`);
    }

}
