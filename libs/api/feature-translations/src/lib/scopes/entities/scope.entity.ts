import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Phrase } from '../../phrases/entities/phrase.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Scope {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Column({ unique: true })
  @ApiProperty({
    description:
      'The scope name. e.g. "global", "work-orders" or "work-request"',
  })
  name!: string;

  @Column()
  @ApiProperty({
    description:
      'The scope description and where the related translations are  used',
  })
  description!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;

  @OneToMany(() => Phrase, (phrase) => phrase.scope)
  phrases!: Phrase[];
}
