import express from 'express';
import dotenv from 'dotenv';
import path from 'path';


import authRoutes from './routes/authroute.js';
import messageRoutes from './routes/messageroute.js';
import { connectDB } from './lib/db.js';

dotenv.config();


const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3001;


app.use(express.json()); // for parsing application/json

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


// make ready for deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

app.listen(PORT, () => {
    console.log("Server is running on port:"+ PORT);
    connectDB();
});