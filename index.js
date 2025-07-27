import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './utils/db.js';
import User from './model/user.model.js';
import { registerUser } from './controllers/user.controller.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT||3000;
// setting up cors
// checking for contributions (failed)
// adding the .gitignore file to ignore node_modules and .env files
app.use(express.json());

app.use(express.urlencoded({extended:true}))


app.use(cors({
  origin:['http://127.0.0.1:5500',process.env.BASE_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/', (req, res) => {  
  res.send(`Hello, World! You requested: ${JSON.stringify(req.headers)}`);
});



// console.log(process.env); 
// connecting to the db
db()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

// importing user routes and imported after db connection
app.use('/api/v1/user', registerUser);
