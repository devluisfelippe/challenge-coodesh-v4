import { Router } from "express";

const router = Router();


router.get("/health_check", (req, res) => res.send({ message: "health-checked" }).status(200) );

export default router;