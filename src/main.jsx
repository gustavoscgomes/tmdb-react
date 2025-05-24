import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Contato from "./pages/Contato/Contato.jsx";
import Detalhes from "./pages/Detalhes/Detalhes.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import UpcomingMovies from "./pages/UpcomingMovies/UpcomingMovies.jsx";
import About from "./pages/About/About.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<UpcomingMovies />} />
        <Route path="/contato" element={<Contato/>} />
        <Route path="/sobre" element={<About/>} />
        <Route path="/filme/:id" element={<Detalhes />} />
        <Route path="search/:query" element={<SearchPage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
