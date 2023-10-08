import { isDefined, validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "@/database/data-source";
import { ResponseUtil } from "@/utils/Response";
import { Book } from "@/database/entities/Book";
import { BookDto } from "@/core/dtos/book.dto";
import { IsNull, Not } from "typeorm";
import { Borrow } from "@/database/entities/Borrow";

export class BooksController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Book);
      const users = await repo.find();
      return ResponseUtil.sendResponse(res, 'Successfully retrieved books', users, null);
    } catch (error) {
      return ResponseUtil.sendError(res, 'Failed to retrieve books',500, error);
    }
  }

  async getBook(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const book = await AppDataSource.getRepository(Book).findOneByOrFail({
      id
    });
    const avarege = await AppDataSource.query(`select avg(score) as avg from borrows where bookId='${id}' and returnDate is not null group by bookId `)
    const borrowRepo = AppDataSource.getRepository(Borrow);
        const result = await borrowRepo.findOne({
          where:{
            book: {id:book.id},
            returnDate: IsNull()
          }
        });
    const bookInfo = {
      book: book.toPayload(),
      avarageScore: avarege.length>0 ? avarege[0].avg: 0,
      available: !isDefined(result),
    } 
    return ResponseUtil.sendResponse<any>(res, "Fetch book successfully",  bookInfo);
  }
  
  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const dto = new BookDto();
    dto.name = name;

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Book);
    const newBook = repo.create(dto);
    await repo.save(newBook);

    return ResponseUtil.sendResponse(res, "Successfully added", newBook, null);

  }


}
