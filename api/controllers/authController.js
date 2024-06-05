// controllers/authController.js
import { db } from "../db.js";

export const login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json("Por favor, preencha todos os campos.");
  }

  const q = "SELECT * FROM login WHERE email = ? AND senha = ?";
  const values = [email, senha];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(401).json("Email ou senha incorretos.");
    }

    return res.status(200).json("Login bem-sucedido!");
  });
};
