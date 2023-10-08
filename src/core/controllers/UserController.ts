import { AppDataSource } from "@/database/data-source";
import { User } from "@/database/entities/User";
import { ResponseUtil } from "@/utils/Response";
import { isDefined, validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { UserDto } from "@/core/dtos/user.dto";
import { BorrowDto } from "@/core/dtos/borrow.dto";
import { Borrow } from "@/database/entities/Borrow";
import { Book } from "@/database/entities/Book";
import { IsNull } from "typeorm";

export class UserController {

  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const dto = new UserDto();
    dto.name = name;

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(User);
    const newUser = repo.create(dto);
    await repo.save(newUser);

    return ResponseUtil.sendResponse(res, "Successfully registered", newUser, null);

  }
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(User);
      const users = await repo.find({    });
      return ResponseUtil.sendResponse(res, 'Successfully retrieved users', users, null);
    } catch (error) {
      return ResponseUtil.sendError(res, 'Failed to retrieve users',500, error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const repo = AppDataSource.getRepository(User);
      const user = await repo.findOne({
        where:{
          id,
        },
        relations:['borrows','borrows.book'],
      });

      const currentDate = new Date();
      if(user!==null){
        const currentBorrows = user.borrows.filter((borrow) => !borrow.returnDate);
        const pastBorrows = user.borrows.filter((borrow) => borrow.returnDate);
        const userInfo = {
          id: user.id,
          name: user.name,
          currentBorrows: currentBorrows.map((borrow) => ({
            book: {name:borrow.book.name,id:borrow.book.id},
            borrowDate: borrow.createdAt,
          })),
          pastBorrows: pastBorrows.map((borrow) => ({
            book: {name:borrow.book.name,id:borrow.book.id},
            borrowDate: borrow.createdAt,
            returnDate: borrow.returnDate,
          })),
        };
      
        return ResponseUtil.sendResponse(res, 'Successfully retrieved user', userInfo, null);
      
      }
    
      if (!user) {
        return ResponseUtil.sendError(res, 'User not found',404);
      }

      return ResponseUtil.sendResponse(res, 'Successfully retrieved user', user, null);
    } catch (error) {
      return ResponseUtil.sendError(res, 'Failed to retrieve user',500, error);
    }
  }
  async borrow(req: Request, res: Response, next: NextFunction) {
    const params = req.params;
    const dto = new BorrowDto();
    const bookRepo = AppDataSource.getRepository(Book);
    const _book = await bookRepo.findOne({
      where:{
        id:params.bookId,
      }
    });
    if(!isDefined(_book)){
      return ResponseUtil.sendError(res, "Book not found ", 404, null);
    }else{
      if (_book !== null) {
        const borrowRepo = AppDataSource.getRepository(Borrow);
        const result = await borrowRepo.findOne({
          where:{
            book: {id:_book.id},
            returnDate: IsNull()
          }
        })
        if(isDefined(result)){
          return ResponseUtil.sendError(res, "Book is not available", 404, null);
        }
      }
    }
    const userRepo = AppDataSource.getRepository(User);
    const _user = await userRepo.findOne({
      where:{
        id:params.userId,
      }
    });

    if(!isDefined(_user)){
      return ResponseUtil.sendError(res, "User not found ", 404, null);
    }
    const repo = AppDataSource.getRepository(Borrow);
    const borrow = repo.create();
    if(_user!==null){
      borrow.borrowedBy =_user;
    }
    if(_book!==null){
      borrow.book =_book;
    }
    await repo.save(borrow);
    console.log(1);

    return ResponseUtil.sendResponse(res, "Successfully reserved", borrow, null);

  }
  async return(req: Request, res: Response, next: NextFunction) {
    const params = req.params;

    const dto = new BorrowDto();
    try {
      const { score } = req.body;
      dto.score = score;
      await validateOrReject(dto);
      
    } catch (error) {
      return ResponseUtil.sendError(res, `Score not found.${error} `, 500, null);
    }


    const bookRepo = AppDataSource.getRepository(Book);
    const _book = await bookRepo.findOne({
      where:{
        id:params.bookId,
      }
    });
    if(!isDefined(_book)){
      return ResponseUtil.sendError(res, "Book not found ", 404, null);
    }

    const userRepo = AppDataSource.getRepository(User);
    const _user = await userRepo.findOne({
      where:{
        id:params.userId,
      }
    });
    if(!isDefined(_user)){
      return ResponseUtil.sendError(res, "User not found ", 404, null);
   }
   Object.assign(dto, params);
    const repo = AppDataSource.getRepository(Borrow);
    if (_book !== null && _user !== null) {
      const result = await AppDataSource.query(
        `select * from borrows where borrowedById='${_user.id}' and bookId='${_book.id}' `);
        console.log(result);
        if(!isDefined(result)){
          return ResponseUtil.sendError(res, "Not found",404, null);
        }
        const item = result[0];
        console.log(item);
        if(item.returnDate !== null){
          return ResponseUtil.sendError(res, "This book has already been delivered",500, null);
        }         
        item.returnDate = new Date();
        item.score = dto.score;
        console.log('önce',item);

        await repo.save(item);
        console.log('sonra',item);
    }

    return ResponseUtil.sendResponse(res, "Successfully return", null, null);

  }

}
