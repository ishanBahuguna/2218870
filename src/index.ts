
import express, { NextFunction } from "express"
import { Request , Response } from "express";
import urlRouter from "./routes/route"

import { log } from "./middlerwares/log";


const PORT = 3000;
const app = express();

app.use(express.json())

app.use("/your-short-url" , urlRouter)
app.use("/" , urlRouter)



app.listen(PORT , () => {
    console.log(`Server listening on port ${PORT}`)
})

export default app;

