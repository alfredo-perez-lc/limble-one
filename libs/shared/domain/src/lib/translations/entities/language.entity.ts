import { Column, Entity, OneToMany } from 'typeorm';
import { Translation } from './translation.entity';
import { BaseEntity } from '../../shared/base.entity';

@Entity()
export class Language extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  name!: string;

  @OneToMany(() => Translation, (translation) => translation.language)
  translations!: Translation[];
}
