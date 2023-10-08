import {  Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DBTable } from "@/constants/DBTable";
import { Borrow } from "./Borrow";

@Entity(DBTable.USERS)
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Borrow, (borrow) => borrow.borrowedBy)
  borrows: Borrow[];

  toResponse(): Partial<User> {
    const responseUser = new User();
    responseUser.id = this.id;
    responseUser.name = this.name;
    return responseUser;
  }
}
