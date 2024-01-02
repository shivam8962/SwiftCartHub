const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

//app.use(express.json());

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts)
router.route("/products/new").post(isAuthenticatedUser, authorizeRoles("admin"),createProduct)
router.route("/products/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
router.route("/products/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
router.route("/products/:id").get(getProductDetails)
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview)

module.exports = router 