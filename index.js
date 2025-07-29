import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './utils/db.js';
import UserRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();


const app = express();
const PORT = process.env.PORT||3000;
// setting up cors
// checking for contributions (failed)
// adding the .gitignore file to ignore node_modules and .env files


// express middlewares 
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res)   => {  
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
// ⭐here as you can see we used user/ and in registerUser we used /register but after appending it resulted in /user/register because express consider it that way but in fastapi in python consider it //
app.use('/api/v1/user/', UserRoutes);
