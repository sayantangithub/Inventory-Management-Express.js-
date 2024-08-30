import ProductController from "./src/controllers/product.controller.js";
import express from "express";
import path from "path";

const productController = new ProductController();
const server = express();
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.get("/", productController.getProducts);
server.use(express.static("src/views"));
server.listen(4090);
