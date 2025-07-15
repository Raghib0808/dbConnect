import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


const app = express();
// const PORT = process.env.PORT||3000;
const PORT = 8080;

// setting up cors
// adding the .gitignore file to ignore node_modules and .env files
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(cors({
  origin:['http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/', (req, res) => {  
  res.send(`Hello, World! You requested: ${JSON.stringify(req.headers)}`);
});



// console.log(process.env); 


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});