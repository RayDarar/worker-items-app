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
    type: "integer",
  })
  price: number;

  @ManyToOne(
    () => Worker,
    worker => worker.items,
    { onDelete: "CASCADE" }
  )
  worker: Worker;
}
