const express = require("express");
const app = express();

app.use(express.json());

// Base de datos en memoria
let products = [
  { id: 1, name: "Laptop", price: 850.00, category: "Electrónica" },
  { id: 2, name: "Mouse Inalámbrico", price: 25.99, category: "Accesorios" },
  { id: 3, name: "Teclado Mecánico", price: 75.00, category: "Accesorios" },
];

let nextId = 4;

// GET - Obtener todos los productos
app.get("/products", (req, res) => {
  res.json(products);
});

// GET - Obtener producto por ID
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (product !== undefined) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

// POST - Crear un nuevo producto
app.post("/products", (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = { id: nextId++, name, price, category };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT - Actualizar un producto
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index].name = req.body.name;
    products[index].price = req.body.price;
    products[index].category = req.body.category;
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

// DELETE - Eliminar un producto
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ message: `Producto con id: ${id} ha sido eliminado correctamente` });
});

app.listen(3000, () => {
  console.log("API corriendo en http://localhost:3000");
});
