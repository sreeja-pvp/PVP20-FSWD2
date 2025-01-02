const express = require("express")
const app = express();
const port = 3000;

app.use(express.json())

app.listen(port,()=>{
    console.log(`server is running in ${port}`)
})

const users = [
    { username: "admin", password: "admin" }, // Example user
    { username: "testuser", password: "testpass" }
];

const authenticate = (req, res, next) => {
    const {username, password} = req.body;

    if(!username || !password)
        res.status(400).json({message : "username and password required"});

   
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        res.json("User Logged Successfully")
        
        next(); // User authenticated successfully, proceed to the next middleware
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
};


app.get("/login",authenticate,(req,res)=>{
    res.status(200).json("Welcome to Login Page")
})
app.get("/products",(req,res)=>{
    res.status(200).json("Welcome to Products Page");
})
