import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#032541" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <NavLink to="/">
            <Box
              component="img"
              src={logo}
              alt="logo tmdb"
              sx={{ height: 40, mr: 2 }}
            />
          </NavLink>

          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Typography sx={navLinkSX}>Lançamentos</Typography>
          </NavLink>
          <NavLink to="/contato" style={{ textDecoration: "none" }}>
            <Typography sx={navLinkSX}>Contato</Typography>
          </NavLink>
          <NavLink to="/sobre" style={{ textDecoration: "none" }}>
            <Typography sx={navLinkSX}>Sobre</Typography>
          </NavLink>
        </Box>

        <Box sx={{ mt: { xs: 1, md: 0 } }}>
          <SearchBar />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Estilo dos links de navegacao
const navLinkSX = {
  color: "#ffffff",
  px: 2,
  fontSize: 16,
  "&:hover": {
    color: "#90caf9",
  },
};

export default Header;
