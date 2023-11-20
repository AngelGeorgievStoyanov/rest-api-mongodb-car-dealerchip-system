import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";



const port: number = 4000;
const hostname: string = 'localhost';
const dbname = 'car-dealerchip-system'
const connectionString = `mongodb://localhost:27017/${dbname}`;

start()
async function start() {



    try {
        await mongoose.connect(connectionString)
        console.log(`Database ${dbname} connected!`)
    } catch (err: any) {
        throw new Error(err.message)
    }



    const app = express();


    app.use(cors({
        origin: '*',
        methods: 'GET,POST,PUT,DELETE'
    }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 }));
    app.use(bodyParser.json());
    app.use(bodyParser.raw({ limit: '50mb', inflate: true }))

    app.get('/', (req, res) => {
        res.json({ message: `TEST -> REST service ${dbname} operational at ${port}` });
    });

   
    app.listen(port, hostname, (() => {
        console.log(`HTTP Server listening on: http://${hostname}:${port}`);

    }))

    app.on('error', err => {
        console.log('Server error:', err);
    });
}