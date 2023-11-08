import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToOne(() => Scope, (scope) => scope.phrases)
  scope!: Scope;

  @OneToMany(() => Translation, (translation) => translation.phrase)
  translations!: Translation[];
}
