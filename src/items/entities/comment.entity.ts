import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // ბევრი კომენტარი ეკუთვნის ერთ პროდუქტს
  @ManyToOne(() => Item, (item) => item.comments)
  item: Item;

  constructor(entity: Partial<Comment>) {
    Object.assign(this, entity);
  }
}