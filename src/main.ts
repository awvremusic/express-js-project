import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';

const upload = multer();

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const people: {name: string, color: string}[] = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/add-person', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'add-person.html'));
});

app.post('/api/add-person', upload.none(), (req: Request, res: Response) => {
  console.log(req.body)
  const { fullName, color } = req.body;
  people.push({ name: fullName, color });
  res.redirect('/');
});

app.get('/api/people', (req, res) => {
  res.json(people);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});