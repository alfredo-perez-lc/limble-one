import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Language, (language) => language.translations)
  language!: Language;

  @ManyToOne(() => Phrase, (phrase) => phrase.translations)
  phrase!: Phrase;
}
