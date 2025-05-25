import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Contato from "./pages/Contato/Contato";
import Footer from "./components/Footer/Footer";
import SearchPage from "./pages/SearchPage/SearchPage";
import UpcomingMovies from "./pages/UpcomingMovies/UpcomingMovies";
import About from "./pages/About/About";
import Details from "./pages/Details/Details";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<UpcomingMovies />} />
        <Route path="/contato" element={<Contato/>} />
        <Route path="/sobre" element={<About/>} />
        <Route path="/filme/:id" element={<Details />} />
        <Route path="search/:query" element={<SearchPage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
