import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './utils/db.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT||3000;
// const PORT = 8080;
// console.log(process.env.PORT);

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
db();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});