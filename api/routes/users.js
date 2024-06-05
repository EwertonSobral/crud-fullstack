import express from "express";
import { addUser, deleteUser, getUsers, updateUser, searchUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/search", searchUsers); // Nova rota de busca

export default router;
