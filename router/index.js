const Router = require("express").Router;
const userController = require("../controllers/user-controller.js");
const orderController = require("../controllers/order-controller.js");

const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware.js");

const router = new Router();

router.post(
   "/registration",
   body("email").isEmail(),
   body("password").isLength({ min: 3, max: 32 }),
   userController.registration
);
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.get("/activate/:link", userController.activate); // активация аккаунта на почте
router.get("/refresh", userController.refresh); // перезапись access токена, в случае если он умер

router.post("/makeOrder", orderController.makeOrder);
router.post("/acceptOrder", authMiddleware, orderController.acceptOrder);
router.get("/getOrders", authMiddleware, orderController.getAllOrders);
router.get("/getUserOrders", authMiddleware, orderController.getUserOrders);

module.exports = router;
