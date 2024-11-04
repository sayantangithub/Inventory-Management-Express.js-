import { body, validationResult } from "express-validator";
export default async function validatePost(req, res, next) {
  //   const { name, price, imageURL } = req.body;
  //   let errors = [];
  //   if (!name || name.trim() == "") {
  //     errors.push("Name is required");
  //   }
  //   if (!price || parseFloat(price) < 1) {
  //     errors.push("Price must be a positive value");
  //   }
  //   try {
  //     const validUrl = new URL(imageURL);
  //   } catch (err) {
  //     errors.push("URL is invalid");
  //   }

  //1. setup rules for validation
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a positive value"),
    // body("imageURL").isURL().withMessage("Invalid URL"),
    body("imageURL").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];
  //2. run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));
  //3. check if there are any errors after running the rules.
  const valiadtionError = validationResult(req);

  if (!valiadtionError.isEmpty()) {
    return res.render("new-product", {
      errorMessage: valiadtionError.array()[0].msg,
    });
  }
  next();
}
