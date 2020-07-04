import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./item.entity";

@Entity("workers")
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 40,
    nullable: false,
  })
  firstName: string;

  @Column({
    length: 40,
    nullable: false,
  })
  lastName: string;

  @Column({
    length: 40,
    nullable: true,
  })
  middleName?: string;

  @OneToMany(
    () => Item,
    item => item.worker,
    { onDelete: "CASCADE" }
  )
  items: Item[];
}
