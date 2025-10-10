import express, { type Express, type Request, type Response } from "express";
import mongoose from "mongoose";

import articleController from "./controllers/article.ts";
import commentController from "./controllers/comment.ts";
import authorController from "./controllers/author.ts"

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

mongoose.connect("mongodb+srv://robinristokivit_db_user:CK64rGZICvUMrghu@cluster0.fnbyl4z.mongodb.net/");
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.use('/', articleController);

app.use('/', commentController);

app.use('/', authorController);

const PORT: number = 3000;

app.listen(PORT,() => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});