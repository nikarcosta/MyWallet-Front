import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import TokenContext from "../contexts/TokenContext";

import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import Home from "./Home";
import Entradas from "./Entradas";
import Saidas from "./Saidas";

import GlobalStyle from "../styles/globalStyles";

export default function App(){

    const [token, setToken] = useState("");

    return (
        <>
            <TokenContext.Provider value={{token, setToken}}>
            <GlobalStyle/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<TelaLogin />} />
                        <Route path="/cadastro" element={<TelaCadastro />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/nova-entrada" element={<Entradas />} />
                        <Route path="/nova-saida" element={<Saidas />} />
                    </Routes>
                </BrowserRouter>
                </TokenContext.Provider> 
        </>
    );
}