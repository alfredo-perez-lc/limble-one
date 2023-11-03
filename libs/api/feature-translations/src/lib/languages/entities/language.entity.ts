import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Translation } from '../../translations/entities/translation.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;

  @Column()
  name!: string;

  @OneToMany(() => Translation, (translation) => translation.language)
  translations!: Translation[];
}
