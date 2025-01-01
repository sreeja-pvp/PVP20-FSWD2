const express = require("express");
const app = express() ; // The express() function is a top-level function exported by the express module.
const port = 3000;

app.use(express.json());

let products = [
    {id : 101 , name : "Table" , quantity : 3} ,
    {id : 102 , name : "Chair" , quantity : 2} 
]


// GET all Products
app.get("/products",(req,res) => {
    res.status(200).json(products)
});

// Get Product By ID
app.get("/products/:id",(req,res)=>{
    const productId = parseInt(req.params.id);
    const product = products.find(i =>i.id == productId);
    
    if(product)
        res.status(200).json(product)
    
    else 
       res.status(400).json({message : "Product Not Found"})
    
})

// Add New Product
app.post('/save', (req, res) => {
    const newItem = req.body;
    if (!newItem.name) {
      return res.status(400).json({ message: 'Name is required' });
    }
  
    newItem.id = products[products.length - 1].id + 1;
    products.push(newItem);
    res.status(201).json(newItem);
  });


// Update the Product
app.put('/update/:id', (req, res) => {
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
  app.delete('/delete/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(i => i.id === productId);
  
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });



