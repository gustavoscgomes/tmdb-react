import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#032541",
        padding: "10px",
        color: "white",
        marginTop: "4em",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className="mr-1 credits-text">Desenvolvido por... </p>
      </div>
    </footer>
  );
};

export default Footer;
