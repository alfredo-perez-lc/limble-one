import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Translation } from '../../translations/entities/translation.entity';
import { Scope } from '../../scopes/entities/scope.entity';

@Entity()
@Index(['key', 'scope'])
export class Phrase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  key!: string;

  @Column()
  text!: string;

  @ManyToOne(() => Scope, (scope) => scope.phrases)
  scope!: Scope;

  @OneToMany(() => Translation, (translation) => translation.phrase)
  translations!: Translation[];
}
