import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "@/constants/DBTable";
import { Borrow } from "./Borrow";

@Entity(DBTable.BOOKS)
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];

  toPayload(): Partial<Book> {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
