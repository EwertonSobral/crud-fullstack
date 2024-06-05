import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SearchFormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  width: 95%;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 0 5px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #28a745;
  color: white;
  height: 42px;
`;

const SearchForm = ({ setUsers, getUsers }) => {
  const ref = useRef();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleSearch = async (name) => {
    if (!name) {
      return toast.warn("Preencha o campo de consulta!");
    }

    await axios
      .get(`http://localhost:8800/search?nome=${name}`)
      .then(({ data }) => {
        setUsers(data);
        toast.success("Consulta realizada com sucesso!");
      })
      .catch(({ data }) => toast.error(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      await axios
        .get(`http://localhost:8800/search?nome=${value}`)
        .then(({ data }) => {
          setUsers(data);
        })
        .catch(({ data }) => toast.error(data));
    } else {
      getUsers(); // Reset the list if the input is cleared
    }
  };

  const handleNovo = () => {
    navigate('/cadastrar');
  };

  return (
    <SearchFormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Consultar Usuários</Label>
        <Input name="query" value={query} onChange={handleInputChange} />
      </InputArea>
      <Button type="submit">CONSULTAR</Button>
      <Button type="submit" onClick={handleNovo}>NOVO</Button>
    </SearchFormContainer>
  );
};

export default SearchForm;
