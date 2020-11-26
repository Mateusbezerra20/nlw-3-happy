import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'

import Image from './Image'

@Entity('orphanages') // Veiculando a classe abaixo com a tabela orphanages
export default class Orphanage {
    // Definindo variáveis da classe

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column()
    about: string

    @Column()
    instructions: string

    @Column()
    opening_hours: string

    @Column()
    open_on_weekends: boolean

    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'orphanage_id'}) //Node da coluna que armazena o relacionamento
    images: Image[]
}