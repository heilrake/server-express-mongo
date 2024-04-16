import express from "express";
import { body } from "express-validator";
import { authCtrl } from "./controllers";
import { authMiddleware } from "../../middlewares/auth-middleware";

const router = express.Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  authCtrl.registration,
);
router.post("/login", authCtrl.login);
router.post("/logout", authCtrl.logout);

router.get("/refresh", authCtrl.refresh);

router.get("/check", authMiddleware, authCtrl.check);

export { router as authRouter };
