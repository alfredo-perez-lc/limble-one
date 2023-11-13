import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Translation } from './translation.entity';
import { Scope } from './scope.entity';
import { BaseEntity } from '../../shared/base.entity';

@Entity()
@Index(['key', 'scope'])
export class Phrase extends BaseEntity {
  @Column({ unique: true })
  key!: string;

  @Column()
  text!: string;

  @ManyToOne(() => Scope, (scope) => scope.phrases)
  scope!: Scope;

  @OneToMany(() => Translation, (translation) => translation.phrase)
  translations!: Translation[];
}
