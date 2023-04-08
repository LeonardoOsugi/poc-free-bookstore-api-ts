import connectionDb from "../config/database.js";
import { DescriptionId } from "../protocols/book.js";

async function create({ name_book, author, userId }: DescriptionId) {
  await connectionDb.query(
    `
        INSERT INTO books (name, author, user_id)
        VALUES ($1, $2, $3)
        `,
    [name_book, author, userId]
  );
}

async function findByName(name_book:string) {
  return await connectionDb.query(
    `
        SELECT * FROM books WHERE name = $1;
    `,
    [name_book]
  );
}

async function findAll() {
  return await connectionDb.query(
    `
        SELECT 
          b.id, b.name, b.author, b.available, 
          u.name as "createdBy"
        FROM books b
        JOIN users u
        ON b.user_id = u.id;
    `
  );
}

async function findById(id:number) {
  return await connectionDb.query(
    `
          SELECT * FROM books 
          WHERE id = $1;
      `,
    [id]
  );
}

async function updateStatusBook(status:boolean, bookId:number) {
  await connectionDb.query(
    `
      UPDATE books
      SET available = $1
      WHERE id = $2;
  `,
    [status, bookId]
  );
}

async function deleteBook(bookId:number){
    await connectionDb.query(`
    DELETE FROM books WHERE id = $1
    `,[bookId]);
}

async function deleteMyBook(bookId:number){
    await connectionDb.query(`
    DELETE FROM "myBooks" WHERE book_id = $1
    `,[bookId]);
}

async function takeBook(userId:number, bookId:number) {
  await connectionDb.query(
    `
      INSERT INTO "myBooks" (user_id, book_id)
      VALUES ($1, $2);
    `,
    [userId, bookId]
  );
}

async function findAllMyBooks(userId:number) {
  return await connectionDb.query(
    `
    SELECT 
      u.name as "user_name",
      b.name as "book_name",
      b.author as "book_author" 
    FROM "myBooks" m
      JOIN users u ON m.user_id = u.id
      JOIN books b ON m.book_id = b.id
    WHERE m.user_id = $1
    `,
    [userId]
  );
}

export default {
  create,
  findByName,
  findAll,
  findById,
  takeBook,
  updateStatusBook,
  findAllMyBooks,
  deleteBook,
  deleteMyBook
};