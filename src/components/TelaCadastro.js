import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/logo.png";


export default function TelaCadastro(){


    const URL = "http://localhost:5001";

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: "",
        email:"",
        senha:"",
        confirmacaoDeSenha:""       
    });

    function handleSignUp(e){
        e.preventDefault();
        

        const body = {
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
            confirmacaoDeSenha: formData.confirmacaoDeSenha
        }

        const promise = axios.post(`${URL}/cadastro`, body);


        promise.then(response => {

            alert("Usuário cadastrado com sucesso!");
            navigate("/");

        });
        promise.catch(err => {

            const message = err.response.statusText;
            alert(message);

            setFormData({
                nome:"",
                email:"",
                senha:"",
                confirmacaoDeSenha:""
            });
            
        });
    }

    function handleForm(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function montarFormularioCadastro(){
        return(
            <>
                <form onSubmit={handleSignUp} >
                    <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleForm} required/>
                    <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleForm} required />
                    <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleForm} required/>
                    <input type="password" name="confirmacaoDeSenha" placeholder="Confirme a senha" value={formData.confirmacaoDeSenha} onChange={handleForm} required/>
                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </>
        );
    }

    const formCadastro = montarFormularioCadastro();

    return(
        <Container>
            <div><img src={logo} alt="logo" /></div>
            <FormularioCadastro >{formCadastro}</FormularioCadastro>
            <StyledLink to="/"><h1>Já tem uma conta? Entre agora!</h1></StyledLink>
        </Container>
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
`

const FormularioCadastro = styled.div`

    display: flex;
    flex-direction: column;
    align-self: start;
    width: 100%;

    *{
        margin: 5px 0;
    }

    input{
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

    button {
        width: 100%;
        height: 50px;
        background-color: #A328D6;
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