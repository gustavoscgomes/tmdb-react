
import { Paper, Typography } from "@mui/material";

const About = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 700,
        margin: "40px auto",
      }}
    >
      <Typography variant="h5" gutterBottom>
        🎬 Sobre o Projeto
      </Typography>
      <Typography variant="body1" component="p" sx={{ whiteSpace: "pre-line" }}>
        Este é um projeto de catálogo de filmes desenvolvido com <strong>React</strong> e <strong>TypeScript</strong>. Ele consome a <strong>API do TMDB (The Movie Database)</strong> para exibir os <strong>últimos lançamentos</strong> e permitir a <strong>pesquisa de filmes</strong> por nome.
        {"\n\n"}
        A interface é construída com os componentes do <strong>Material UI (MUI)</strong>, garantindo uma experiência moderna, responsiva e agradável ao usuário.
      </Typography>
    </Paper>
  );
};

export default About;