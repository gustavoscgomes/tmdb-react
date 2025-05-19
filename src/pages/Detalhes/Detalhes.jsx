import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Box, CircularProgress, Typography, Chip } from "@mui/material";
import MovieCard from "../../components/MovieCard/MovieCard";

const Detalhes = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMovie = () => {
    api
      .get(`/movie/${id}?language=pt-BR`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Ocorreu um erro ao buscar o filme.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        m: "1rem", // margin
        p: 4, // padding
        display: "flex",
        gap: 4,
        borderRadius: 1,
        bgcolor: "#fff", // backgroundColor
        flexWrap: "wrap",
      }}
    >
      {/* Coluna da esquerda */}
      <Box flex="0 0 320px">
        <MovieCard
          title={movie.title}
          image={movie.poster_path}
          vote={movie.vote_average}
          release_date={movie.release_date}
          showButton={false}
        />
      </Box>

      {/* Coluna da direita */}
      <Box flex="1">
        <Typography variant="h4" gutterBottom>
          {movie.title}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {movie.overview || "Sem descrição disponível."}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Gêneros:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {movie.genres?.map((genre) => (
              <Chip key={genre.id} label={genre.name} />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">
            Duração: {movie.runtime} minutos
          </Typography>
          <Typography variant="subtitle1">
            Lançamento:{" "}
            {new Date(movie.release_date).toLocaleDateString("pt-BR")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Detalhes;
