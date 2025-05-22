import { UsersEntity } from 'src/users/entities/users.entity';
import { WishesEntity } from 'src/wishes/entities/wishes.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('offers')
export class OffersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'float4' })
  amount: number;

  @Column({ default: false })
  hidden: boolean;

  @ManyToOne(() => UsersEntity, (user) => user.offers)
  user: UsersEntity;

  @ManyToOne(() => WishesEntity, (wishes) => wishes.offers, {
    onDelete: 'CASCADE',
  })
  item: WishesEntity;
}
