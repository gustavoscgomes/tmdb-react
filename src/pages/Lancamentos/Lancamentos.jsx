import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import MovieCard from "../../components/MovieCard/MovieCard";

const Lancamentos = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMovies = () => {
    api
      .get("/movie/upcoming")
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(() => {
        setError("Ocorreu um erro ao buscar os filmes.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  console.log(movies);

  return (
    <Grid
      container
      spacing={2} // Espaçamento entre os itens
      sx={{
        p: 2, // padding: 16px
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 2, // gap: 16px
      }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          image={movie.poster_path}
          vote={movie.vote_average}
          overview={movie.overview}
          release_date={movie.release_date}
          showButton={true}
        />
      ))}
    </Grid>
  );
};

export default Lancamentos;
