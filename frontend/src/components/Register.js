import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/auth/register", form);
      toast.success("Usuário registrado com sucesso.");
    } catch (error) {
      toast.error("Erro ao registrar usuário.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome:</label>
      <input type="text" name="nome" value={form.nome} onChange={handleChange} />
      <label>Email:</label>
      <input type="email" name="email" value={form.email} onChange={handleChange} />
      <label>Senha:</label>
      <input type="password" name="senha" value={form.senha} onChange={handleChange} />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
