import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Box, Typography, Chip } from "@mui/material";
import MovieCard from "../../components/MovieCard/MovieCard";
import LoadingBox from "../../components/ui/LoadingBox";
import ErrorBox from "../../components/ui/ErrorBox";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  genres: Genre[];
  runtime: number;
}
console.log("entrou");

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log("movie: ", movie);
  
  const getMovie = () => {
    api
      .get<MovieDetails>(`/movie/${id}`)
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

  if (!id) {
    return <ErrorBox message="ID do filme não fornecido." />;
  }

  if (loading) {
    return <LoadingBox />;
  }

  if (error || !movie) {
    return <ErrorBox message={error || "Filme não encontrado."} />;
  }

  return (
    <Box
      sx={{
        m: "1rem",
        p: 4,
        display: "flex",
        gap: 4,
        borderRadius: 1,
        bgcolor: "#fff",
        flexWrap: "wrap",
      }}
    >
      <Box flex="0 0 320px">
        <MovieCard
          id={movie.id}
          title={movie.title}
          image={movie.poster_path}
          vote={movie.vote_average}
          release_date={movie.release_date}
          showButton={false}
        />
      </Box>

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
