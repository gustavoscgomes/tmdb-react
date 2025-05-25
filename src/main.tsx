import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Lancamentos from "./pages/Lancamentos/Lancamentos";
import Contato from "./pages/Contato/Contato";
import Detalhes from "./pages/Detalhes/Detalhes";
import Footer from "./components/Footer/Footer";
import SearchPage from "./pages/SearchPage/SearchPage";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Lancamentos />} />
        <Route path="/contato" element={<Contato/>} />
        <Route path="/filme/:id" element={<Detalhes />} />
        <Route path="search/:query" element={<SearchPage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
