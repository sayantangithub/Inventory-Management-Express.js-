import ProductModel from "../models/product.model.js";

class ProductsController {
  getProducts(req, res, next) {
    var products = ProductModel.get();
    res.render("product", {
      product: products,
      userEmail: req.session.userEmail,
    });
  }

  getAddForm(req, res, next) {
    res.render("new-product", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }

  submitProduct(req, res, next) {
    // validate data
    //created a separate js file for validation.
    const { name, desc, price } = req.body;
    const imageURL = "images/" + req.file.filename;
    ProductModel.post(name, desc, price, imageURL);
    var products = ProductModel.get();
    res.render("product", {
      product: products,
      userEmail: req.session.userEmail,
    });
  }
  getUpdateProductView(req, res, next) {
    //1. If the product exists return view
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    }
    //2. else return error.
    else {
      res.status(401).render("error");
    }
  }
  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    var products = ProductModel.get();
    res.render("product", { product: products, errorMessage: null });
  }
  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      res.status(401).render("Product not found");
    }
    ProductModel.delete(id);
    var products = ProductModel.get();
    res.render("product", {
      product: products,
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }
}

export default ProductsController;
