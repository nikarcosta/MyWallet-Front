import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TokenContext from "../contexts/TokenContext";
import vector from "../assets/vector.png"

export default function Home(){

  const URL = "http://localhost:5000";

  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const [listaDeTransacoes, setListaDeTransacoes] = useState([]);


  const chave = token.token;

  const config = {
    headers: {
        "Authorization": `Bearer ${chave}`
    }
}

  function logOut(){


    console.log(chave);


    const promise = axios.put(`${URL}/logout`, config);

    promise.then((response) => {
      console.log(response);
      alert(response.data);

      navigate("/");
    });

    promise.catch((err) => {
      const message = err.response.statusText;
      console.log("deu erro aqui")
      alert(message);
    });


  }


  function RequisitarListaDeTransacoes(){
    useEffect(() => {
      const promise = axios.get(`${URL}/movimentacoes`, config);

      promise.then((response) => {
        const { data } = response;
        console.log(data);
        setListaDeTransacoes(data);
      });
  
      promise.catch(err => {
        const message = err.response.statusText;
        alert(message);
      });


    },[]);

    
  }

  const requisicaoListaDeTransacoes = RequisitarListaDeTransacoes();

  function renderizarListaDeTransacoes(){

    const transacoes = listaDeTransacoes.map((item,index) => {
      return(
        <>
          <ContainerTransacao tipo={item.tipo} key={index}>
            <div><span>{item.data}</span><span>{item.descricao}</span></div><div><h1>{item.valor}</h1></div>
          </ContainerTransacao>
        </>
      );
    });

    if(listaDeTransacoes.length > 0){
      return(transacoes);
    } else {
      return(<>
      <span>Não há registros de entrada ou saída</span>
      </>);
    }
  }

  const listaDeHabitosRenderizada = renderizarListaDeTransacoes();

  function calcularSaldoTotal() {

    const saldoInicial = 0;

    return listaDeTransacoes.reduce((valorAnterior, valorAtual) => {
      if(valorAtual.tipo === "entrada"){
        return valorAnterior + Number(valorAtual.valor);
      } else {
        return valorAnterior - Number(valorAtual.valor);
      }
    }, saldoInicial);
    
  }


  function renderizarSaldo(){
    if(listaDeTransacoes.length > 0){
      const saldo = calcularSaldoTotal();
      return (
        <Saldo saldo={saldo}><div><strong>SALDO</strong></div><div><span>{saldo}</span></div></Saldo>
      );
    }
  }

  const saldoRenderizado = renderizarSaldo();
  
    return(
        <>
        <Cabecario><h3>Olá</h3><img src={vector} alt="logout" onClick={logOut}/></Cabecario>
        <Container>
            {requisicaoListaDeTransacoes}
            {listaDeHabitosRenderizada}
            {saldoRenderizado}  
        </Container>
        <Footer><Link to="/nova-entrada"><button>Nova Entrada</button></Link><Link to="/nova-saida"><button>Nova Saída</button></Link></Footer>
        </>
    );
}


const Container = styled.div`

    min-height: 60vh;
    background-color: #FFFFFF;
    padding: 18px;
    border-radius: 5px;
    margin-bottom: 75px;
    margin-top: 90px;
     margin-left: 30px;
    margin-right: 30px;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;

`;

const Cabecario = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 30px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #9059BE;
    width: 100%;

    h3 {
        font-family: Raleway;
        font-size: 26px;
        font-weight: 700;
        text-align: left;
        color: #FFFFFF;
    }

`;

const Footer = styled.div`

  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px;
  background-color: #9059BE;
  position: fixed;
  bottom: 0;
  left: 0;

  * {
    margin:10px 5px 10px 10px; 
  }



  button{
  
    width: 100%;
    height: 114px;
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

const ContainerTransacao = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
  

  span {
    font-family: "Raleway", sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #c6c6c6;
  }

  span:nth-child(2) {
    color: #000000;
    margin-left: 8px;
  }
  
  h1 {
    color: ${function (props) {
    return (props.tipo === "entrada" ? "#03AC00" : "#C70000");
  }};
  }
`;

const Saldo = styled.div`
    padding-top: 50px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;

  span {
    color: ${(props) => (props.saldo >= 0 ? '#03AC00' : '#C70000')}
  }
`;

