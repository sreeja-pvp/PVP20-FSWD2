const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())

const logger = (req,res,next)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next();
}

app.get("/home",logger,(req,res)=>{
  res.status(200).json("Welcome to Home Page!!");
})


app.get("/login",(req,res)=>{
  res.status(200).json("Welcome to Loggin Page!!")
})

app.listen(port,()=>{
  console.log(`Server starting in port ${port}`)
})



let products = [
    {id : 101, name :"Table",quantity : 2} ,
    {id : 102, name :"Chair",quantity : 2} 
]

app.get("/products", logger,(req,res)=>{
    res.json(products);
})

app.get("/products/:id",logger,(req,res)=>{
    const productId = parseInt(req.params.id);
    const product = products.find(i =>i.id == productId);
    
    if(product)
        res.status(200).json(product)
    
    else 
       res.status(400).json({message : "Product Not Found"})
    
})

app.post('/save',logger, (req, res) => {
    const newItem = req.body;
    if (!newItem.name) {
      return res.status(400).json({ message: 'Name is required' });
    }
  
    newItem.id = products[products.length - 1].id + 1;
    products.push(newItem);
    res.status(201).json(newItem);
  });


// Update the Product
app.put('/update/:id', logger,(req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(i => i.id === productId);
  
    if (productIndex !== -1) {
      const updatedProduct = { ...products[productIndex], ...req.body };
      products[productIndex] = updatedProduct;
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });


  // DeleteByID
  app.delete('/delete/:id',logger, (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(i => i.id === productId);
  
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });


