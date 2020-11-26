import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImage1602963183749 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'orphanage_id',
                    type: 'integer',

                }
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE', //Caso o id do orfanato seja alterado, 'orphanage_id' também será.
                    onDelete: 'CASCADE' //Caso o registro de um orfanato seja deletado, a imagem também será.
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
