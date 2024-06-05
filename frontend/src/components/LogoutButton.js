// frontend/src/components/LogoutButton.js

import React from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #d32f2f;
  color: white;
  font-size: 15px;
`;

const LogoutButton = ({ handleLogout }) => {
  return <Button onClick={handleLogout}>Logout</Button>; // Chama a função handleLogout quando o botão é clicado
};

export default LogoutButton;
