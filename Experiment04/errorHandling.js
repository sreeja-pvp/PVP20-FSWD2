const express = require("express");
const app = express();

const port = 3000;

app.use(express.json())

app.listen(port,()=>{
    console.log(`server running in port ${port}`)
})

app.get("/home",(req,res)=>{
    res.status(200).json("Welcome to Home Page")
})

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
};
app.use(errorHandler)