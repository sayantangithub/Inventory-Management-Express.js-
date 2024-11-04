import ProductController from "./src/controllers/product.controller.js";
import express from "express";
import path from "path";
import expressLayout from "express-ejs-layouts";
import validatePost from "./src/middlewares/validateProduct.js";
import { uploadFile } from "./src/middlewares/fileUpload.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastvisit.middleware.js";

const productController = new ProductController();
const userController = new UserController();
const server = express();
server.use(
  session({
    secret: "secret - key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
server.use(express.static("public"));
server.use(cookieParser());
server.use(setLastVisit);
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(expressLayout);

server.get("/", auth, productController.getProducts);
server.get("/add", auth, productController.getAddForm);
server.get("/register", userController.getRegister);
server.post("/register", userController.postRegister);
server.get("/login", userController.getLogin);
server.post("/login", userController.postLogin);
server.get("/logout", userController.logout);
server.get("/update-product/:id", auth, productController.getUpdateProductView);

server.post(
  "/",
  auth,
  uploadFile.single("imageURL"),
  validatePost,
  productController.submitProduct
);
server.post("/update-product", auth, productController.postUpdateProduct);
server.post("/delete-product/:id", auth, productController.deleteProduct);

server.use(express.static("src/views"));
server.listen(5010, () => {
  console.log("Port is live at localhost:5010");
});
