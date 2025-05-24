import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Box, CircularProgress, Typography, Chip } from "@mui/material";
import MovieCard from "../../components/MovieCard/MovieCard";
import LoadingBox from "../../components/ui/LoadingBox";
import ErrorBox from "../../components/ui/ErrorBox";

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMovie = () => {
    api
      .get(`/movie/${id}`)
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
      <LoadingBox />
    );
  }

  if (error) {
    return (
      <ErrorBox message={error} />
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

export default Details;
