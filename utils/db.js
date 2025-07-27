import mongoose from 'mongoose';

const  db=async()=>{
    return mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`Connected to MongoDB at  ${process.env.MONGO_URL}`);
})
.catch((err)=>{
    console.log(`Error connecting to MongoDB: ${err.message}`);
})
}

export default db;