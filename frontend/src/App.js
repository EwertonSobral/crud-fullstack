// src/App.js
import { Route, Routes } from 'react-router-dom';
import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form";
import Grid from "./components/Grid";
import SearchForm from "./components/SearchForm";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  margin-top: 20px;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // if (!authenticated) {
  //   return ;
  // }

  return (
    <>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
      <Routes>
        <Route path='/login' element={
          <LoginForm setAuthenticated={setAuthenticated} />
        } />
        <Route path='/listar' element={
          <Container>
            <Title>Lista de Alunos</Title>
            <SearchForm setUsers={setUsers} getUsers={getUsers} />
            <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
          </Container>
         } />
        <Route path='/cadastrar' element={
          <Container>
            <Title>Cadastre um Aluno</Title>
            <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
          </Container>
        } />
      </Routes>
    </>
  );
}

export default App;
