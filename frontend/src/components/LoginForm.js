// src/components/LoginForm.js
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  width: 300px;
  margin: 100px auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
  width: 100%;
`;

const LoginForm = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      const response = await axios.post("http://localhost:8800/auth/login", { email, senha });
      toast.success(response.data);
      setAuthenticated(true);
      navigate('/listar');
    } catch (error) {
      toast.error("Erro ao realizar o login.");
    }
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit}>
      <h2>Login</h2>
      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Button type="submit">Entrar</Button>
    </LoginFormContainer>
  );
};

export default LoginForm;
