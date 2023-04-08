import errors from "../errors/index.js";
import bookRepositories from "../repositories/bookRepositories.js";
import { DescriptionId } from "../protocols/book.js";

async function create({ name_book, author, userId }: DescriptionId) {
  const {
    rows: [book],
  } = await bookRepositories.findByName(name_book);
  if (book) throw errors.conflictError("Book already exists");

  await bookRepositories.create({ name_book, author, userId });
}

async function findAll() {
  const { rows, rowCount } = await bookRepositories.findAll();
  if (!rowCount) throw errors.notFoundError();
  return rows;
}

async function takeBook(userId:number, bookId:number) {
  const {
    rows: [book],
    rowCount,
  } = await bookRepositories.findById(bookId);
  if (!rowCount) throw errors.notFoundError();
  if (!book.available) throw errors.conflictError("Book not available");

  await bookRepositories.updateStatusBook(false, bookId);
  await bookRepositories.takeBook(userId, bookId);
};

async function deleteBook(bookId:number){
    const {
        rowCount,
      } = await bookRepositories.findById(bookId);
      if (!rowCount) throw errors.notFoundError();
    
      await bookRepositories.deleteMyBook(bookId);
      await bookRepositories.deleteBook(bookId);
}

async function findAllMyBooks(userId:number) {
  const { rows: books, rowCount } = await bookRepositories.findAllMyBooks(
    userId
  );
  if (!rowCount) throw errors.notFoundError();
  return books;
}

export default { create, findAll, takeBook, findAllMyBooks, deleteBook };