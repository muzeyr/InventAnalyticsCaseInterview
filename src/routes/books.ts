import express from "express";
import { ErrorHandler } from "@/core/middlewares/ErrorHandler";
import { BooksController } from "@/core/controllers/BooksController";

const booksController = new BooksController();

const router = express.Router();
router.get("/", ErrorHandler.catchErrors(booksController.get));
router.get("/:id", ErrorHandler.catchErrors(booksController.getBook));
router.post(
  "/",
  ErrorHandler.catchErrors(booksController.create)
);


export default router;
