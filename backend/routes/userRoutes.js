const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/user-signup", userController.signup);
router.post("/user-login", userController.login);
router.post("/user-logout", userController.logout);
router.put("/add-to-cart-only/:productId", userController.addToCartOnly);
router.put("/add-to-cart/:productId", userController.addToCart);
router.get("/cart", userController.getCart);
router.delete("/remove/:productId", userController.removeFromCart);
router.get('/totalamount',userController.totalamount);
router.put("/add-to-wishlist/:productId", userController.addToWishList);
router.get("/wishlist", userController.getWishList);
router.delete("/removefromwishlist/:productId", userController.removeFromWishList);


module.exports = router;
