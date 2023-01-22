import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TokenContext from "../contexts/TokenContext";

import vector from "../assets/vector.png"

export default function Home(){

    return(
        <>
        <Cabecario><h3>Olá,Fulano</h3><img src={vector} alt="logout" /></Cabecario>
        <Container>
            <div>LISTA DE TRANSAÇÕES</div>
        </Container>
        <Footer><Link to="/nova-entrada"><button>Nova Entrada</button></Link><Link to="/nova-saida"><button>Nova Saída</button></Link></Footer>
        </>
    );
}


const Container = styled.div`

    min-height: 100vh;
    background-color: #FFFFFF;
    padding: 0 18px;
    border-radius: 5px;
    margin-bottom: 75px;
    margin-top: 90px;
     margin-left: 30px;
    margin-right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

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

