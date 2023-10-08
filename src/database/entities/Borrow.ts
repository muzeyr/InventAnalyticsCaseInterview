import {  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";
import { DBTable } from "@/constants/DBTable";

@Entity(DBTable.BORROWS)
export class Borrow {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: 0, nullable:true })
  score: number;

  @ManyToOne(() => User, (user) => user.borrows)
  @JoinColumn({ name: "borrowedById" })
  borrowedBy: User;

  @ManyToOne(() => Book, (book) => book.borrows)
  @JoinColumn({ name: "bookId" })
  book: Book;

  @Column({ type: "timestamp", nullable: true })
  returnDate: Date; 
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toResponse(): Partial<Borrow> {
    const responseUser = new Borrow();
    responseUser.id = this.id;
    responseUser.borrowedBy = this.borrowedBy;
    responseUser.book = this.book;
    responseUser.returnDate = this.returnDate;

    return responseUser;
  }
}
