import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TokenContext from "../contexts/TokenContext";

import logo from "../assets/logo.png"

export default function TelaLogin(){

  const URL = "http://localhost:5000";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const { setToken } = useContext(TokenContext);

  function handleLogin(e){

    e.preventDefault();

    const body = {
      email,
      senha
    }

    const promise = axios.post(`${URL}/entrar`, body);

    promise.then((response) => {
      const {data:token} = response;

      setToken({
        token
      });

      navigate("/home");
    });

    promise.catch((err) => {
      const message = err.response.statusText;
      alert(message);
      setEmail("");
      setSenha("");
    });
  }

  function montarFormularioLogin(){
    return(
      <>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <div>
          <button type="submit"><span>Entrar</span></button>
        </div>
      </form>
      </>
    );
  }

  const formLogin = montarFormularioLogin();



  return(
    <>
      <Container>
        <div><img src={logo} alt="logo" /></div>
        <FormularioLogin>{formLogin}</FormularioLogin>
        <StyledLink to="/cadastro"><h1>Primeira vez? Cadastre-se!</h1></StyledLink>
      </Container>
    </>
  );
}


const Container = styled.div`

  margin-top: 90px;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    margin-bottom: 30px;
  }
`;

const FormularioLogin = styled.div`

  display: flex;
  flex-direction: column;
  align-self: start;
  width: 100%;


  * {
    margin: 5px 0;
  }

  input {
    
    width: 100%;
    height: 50px;
    padding-left: 20px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #DBDBDB;
    border-radius:5px;
    border: 1px solid #D5D5D5;
  }

  button{
  
    width: 100%;
    height: 50px;
    background-color:#A328D6;
    border-radius: 5px;
    border: none;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #FFFFFF;
    cursor: pointer;   
  }

`;

const StyledLink = styled(Link)`
    
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    margin-bottom: 30px;
    
    &:hover{
        text-decoration: underline;
    }
`;