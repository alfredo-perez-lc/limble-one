import { Column, Entity, ManyToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Language } from './language.entity';
import { Phrase } from './phrase.entity';
import { BaseEntity } from '../../shared/base.entity';

@Entity()
export class Translation extends BaseEntity {
  @Column()
  @ApiProperty()
  text!: string;

  @ManyToOne(() => Language, (language) => language.translations)
  language!: Language;

  @ManyToOne(() => Phrase, (phrase) => phrase.translations)
  phrase!: Phrase;
}
