import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Phrase } from '../../phrases/entities/phrase.entity';
import { Language } from '../../languages/entities/language.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Column()
  @ApiProperty()
  text!: string;

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

  @ManyToOne(() => Language, (language) => language.translations)
  language!: Language;

  @ManyToOne(() => Phrase, (phrase) => phrase.translations)
  phrase!: Phrase;
}
