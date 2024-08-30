import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    console.log(products);
    res.render("product", { product: products });
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "product.html")
    // );
  }
}
