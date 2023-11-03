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

const phrases = [
  {
    key: 'Paused',
    text: 'Paused',
    id: 1,
  },
  //
];

const translations = [
  {
    language: 10, // Spanish
    text: 'Pausado',
  },
  {
    language: 11, // Chinese
    text: '暂停',
  },
  {
    German: 12, // German
    text: 'Angehalten',
  },
];
