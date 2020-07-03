import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Worker } from "./worker.entity";

@Entity("items")
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 300,
  })
  name: string;

  @Column({
    type: "decimal",
  })
  price: number;

  @ManyToOne(
    () => Worker,
    worker => worker.items
  )
  worker: Worker;
}
