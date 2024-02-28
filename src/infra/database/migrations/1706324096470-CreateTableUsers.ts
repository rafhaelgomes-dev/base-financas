import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1706324096470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const existTableUsers = await queryRunner.hasTable('users');
        if (!existTableUsers) {
            await queryRunner.createTable(
                new Table({
                    name: 'users',
                    columns: [
                        { name: 'id', type: 'serial', isPrimary: true },
                        { name: 'name', type: 'varchar', isNullable: false },
                        { name: 'email', type: 'varchar', isNullable: false },
                        { name: 'password', type: 'varchar', isNullable: false },
                        { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                        { name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }
                    ]
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
