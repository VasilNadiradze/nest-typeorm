import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
}