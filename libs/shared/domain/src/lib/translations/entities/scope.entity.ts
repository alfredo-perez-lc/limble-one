import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Phrase } from './phrase.entity';
import { BaseEntity } from '../../shared/base.entity';

@Entity()
export class Scope extends BaseEntity {
  @Column({ unique: true })
  @ApiProperty({
    description:
      'The scope name. e.g. "global", "work-orders" or "work-request"',
  })
  name!: string;

  @Column()
  @ApiProperty({
    description:
      'The scope description and where the related translations are  used, ' +
      'this description should help developers decide where to create a phrase.',
  })
  description!: string;

  @OneToMany(() => Phrase, (phrase) => phrase.scope)
  phrases!: Phrase[];
}
