import styled from "styled-components";
import { useContext, useState } from "react";
import TokenContext from "../contexts/TokenContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Entradas(){

    const URL = "http://localhost:5001";

    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const  { token }  = useContext(TokenContext);
    const navigate = useNavigate();

    

    function handleEnviarNovaEntrada(e) {
      
      e.preventDefault();

    

      console.log(token.token);

      const body = {
        valor, 
        descricao, 
        tipo: "entrada" 
      }

      const chave = token.token;

      const config = {
        headers: {
          "Authorization": `Bearer ${chave}`
        }
      }

      const promise = axios.post(`${URL}/movimentacoes`, body, config);

      promise.then((response) => {
        console.log(response);
        alert(response.data);

        navigate("/home");
      });

      promise.catch((err) => {
        const message = err.response.statusText;
        alert(message);
        setValor("");
        setDescricao("");
      });
      
    }

    

    function montarFormularioEntrada(){
        return(
          <>
          <form onSubmit={handleEnviarNovaEntrada}>
            <input type="number" name="valor" placeholder="Entrada" value={valor} onChange={(e) => setValor(e.target.value)} required />
            <input type="text" name="descricao" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
            <div>
              <button type="submit"><span>Salvar entrada</span></button>
            </div>
          </form>
          </>
        );
      }
    
      const formEntrada = montarFormularioEntrada();
    
    
    
      return(
        <>
          <Container>
            <div><h3>Nova Entrada</h3></div>
            <FormularioEntrada>{formEntrada}</FormularioEntrada>
            <StyledLink to="/home"></StyledLink>
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

  h3 {
    
    font-family: 'Raleway';
    font-size: 26px;
    color: #FFFFFF;
    margin-bottom: 20px;
  }


`;

const FormularioEntrada = styled.div`

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