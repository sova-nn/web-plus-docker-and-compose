import { UsersEntity } from 'src/users/entities/users.entity';
import { WishesEntity } from 'src/wishes/entities/wishes.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wishlists')
export class WishlistsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string | null;

  @Column()
  image: string;

  @OneToMany(() => WishesEntity, (wishes) => wishes.wishlist, { cascade: true })
  items: WishesEntity[];

  @ManyToOne(() => UsersEntity, (users) => users.wishlists)
  owner: UsersEntity;
}
