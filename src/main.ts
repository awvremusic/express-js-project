import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';
import admin from 'firebase-admin';

type Person = {id: string, name: string, color: string};

const serviceAccount = require(path.join(__dirname,'..','firebase_key.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const upload = multer();

dotenv.config();

const server = express();
const port = process.env.PORT || 8080;
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

server.get('/add-person', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'add-person.html'));
});

server.post('/api/add-person', upload.none(), (req: Request, res: Response) => {
  const { fullName, color } = req.body;

  const peopleCollection = db.collection('people');
  peopleCollection.add({ name: fullName, color })
    .then((docRef: any) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error: any) => {
      console.error("Error adding document: ", error);
    });

  res.redirect('/');
});

server.get('/api/people', (req, res) => {
  const people: Person[] = [];
  const peopleCollection = db.collection('people');
  peopleCollection.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          const person = doc.data() as {name: string, color: string};
          people.push({id: doc.id, ...person});
        }
      });
    })
    .catch((error: any) => {
      console.log("Error getting documents: ", error);
    })
    .finally(() => {
      res.status(200);
      res.json(people);
    });
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});