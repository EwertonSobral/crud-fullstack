import React, { useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import Register from "./Register";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  font-size: 16px;
`;

const Auth = ({ setLoggedIn }) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Container>
      {isRegister ? (
        <>
          <h2>Registrar</h2>
          <Register />
          <Button onClick={() => setIsRegister(false)}>Já tem uma conta? Login</Button>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <Login setLoggedIn={setLoggedIn} />
          <Button onClick={() => setIsRegister(true)}>Não tem uma conta? Registrar</Button>
        </>
      )}
    </Container>
  );
};

export default Auth;
