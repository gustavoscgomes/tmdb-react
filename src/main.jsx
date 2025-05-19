import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Lancamentos from "./pages/Lancamentos/Lancamentos.jsx";
import Contato from "./pages/Contato/Contato.jsx";
import Detalhes from "./pages/Detalhes/Detalhes.jsx";
import Footer from "./components/Footer/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Lancamentos />} />
        <Route path="/contato" element={<Contato/>} />
        <Route path="/filme/:id" element={<Detalhes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
