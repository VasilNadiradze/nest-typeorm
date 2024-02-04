import { 
  Column, 
  Entity, 
  JoinColumn, 
  JoinTable, 
  ManyToMany, 
  OneToMany, 
  OneToOne,
  PrimaryGeneratedColumn, 
} from 'typeorm';
import { Description } from './description.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

/*
  ეს კლასი წარმოადგენს ბაზაში არსებული 'items' ცხრილის პრეზენტაციას, 
  რომელსაც აქვს შემდეგი ველები : id, name და public. @Entity დეკორატორს
  პარამეტრად გადაეცემა ცხრილის დასახელება, თუ ამ პარამეტს არ გადავცემთ,
  TypeORM ცხრილს შექმნის კლასის სახელწოდებიდან გამომდინარე (ამ შემთხვევაში 
  შექმნიდა 'item' ცხრილს)
*/
@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  

  @Column({ default: true })
  public: boolean;

  // ერთ პროდუქტს აქვს ერთი აღწერა, ერთი აღწერა ეკუთვნის ერთ პროდუქტს
  @OneToOne(() => Description, { cascade: true })
  @JoinColumn({ 
    name: 'description_id' 
  })
  description: Description;

  // ერთ პროდუქტს აქვს მრავალი კომენტარი, ერთი კომენტარი ეკუთვნის ერთ პროდუქტს
  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[];  

  // ერთ პროდუქტს აქვს ბევრი ტეგი, ერთ ტეგს აქვს ბევრი პროდუქტი
  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({
    name: 'items_tags' // შუამავალი ცხრილი ტეგებისა და პროდუქტის id ველებით
  })
  tags: Tag[];

  constructor(entity: Partial<Item>) {
    Object.assign(this, entity);
  }
}