import bookServices from "../services/bookServices.js";
import { Request, Response, NextFunction } from "express";
import { Description } from "../protocols/book.js";

async function create(req: Request, res: Response, next: NextFunction) {
  const { name_book, author } = req.body as Description;
  const { id } = res.locals.user;
  try {
    await bookServices.create({ name_book, author, userId: id });

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const books = await bookServices.findAll();

    return res.send({ books });
  } catch (err) {
    next(err);
  }
}

async function takeBook(req: Request, res: Response, next: NextFunction) {
  const { id } = res.locals.user;
  const bookId = +req.params.id;
  try {
    await bookServices.takeBook(id, bookId);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

async function deleteBook(req: Request, res: Response, next: NextFunction){
  const bookId = +req.params.id;
  try {
    await bookServices.deleteBook(bookId);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

async function findAllMyBooks(req: Request, res: Response, next: NextFunction) {
  const { id } = res.locals.user;
  try {
    const books = await bookServices.findAllMyBooks(id);
    return res.send({ books });
  } catch (err) {
    next(err);
  }
}
export default { create, findAll, takeBook, findAllMyBooks, deleteBook };