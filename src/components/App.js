import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";

import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";


import GlobalStyle from "../styles/globalStyles";

export default function App(){
    const [user, setUser] = useState({});

    return (
        <>
          <UserContext.Provider value={{user,setUser}}>
            <GlobalStyle/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<TelaLogin />} />
                        <Route path="/cadastro" element={<TelaCadastro />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>  
        </>
    );
}