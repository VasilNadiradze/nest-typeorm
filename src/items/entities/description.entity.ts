import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('description')
export class Description {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  rating: number;  

  constructor(entity: Partial<Description>) {
    Object.assign(this, entity);
  }
}